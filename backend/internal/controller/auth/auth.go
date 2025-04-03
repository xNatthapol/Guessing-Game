package auth

import (
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"

	"github.com/xNatthapol/guessing-game/internal/config"
	"github.com/xNatthapol/guessing-game/internal/orm"
	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"
)

var jwtSecret []byte

func InitAuth(cfg *config.Config) {
	jwtSecret = []byte(cfg.JWT.Secret)
}

type RegisterBody struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Register(c *gin.Context) {
	var json RegisterBody
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the user already exists
	var existingUser orm.User
	orm.Db.Where("username = ?", json.Username).First(&existingUser)
	if existingUser.ID > 0 {
		c.JSON(http.StatusConflict, gin.H{"status": "error", "message": "User already exists"})
		return
	}

	encryptedPassword, _ := bcrypt.GenerateFromPassword([]byte(json.Password), 10)
	user := orm.User{Username: json.Username, Password: string(encryptedPassword)}
	orm.Db.Create(&user)
	if user.ID > 0 {
		c.JSON(http.StatusCreated, gin.H{"status": "success", "ok": "User created successfully", "userId": user.ID})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to create user"})
	}
}

type LoginBody struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Login(c *gin.Context) {
	var json LoginBody
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the user does not exist
	var existingUser orm.User
	orm.Db.Where("username = ?", json.Username).First(&existingUser)
	if existingUser.ID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "error", "message": "Invalid username or password"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(json.Password))
	if err == nil {
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"userId": existingUser.ID,
			"exp":    time.Now().Add(time.Hour * 24).Unix(),
		})
		tokenString, err := token.SignedString(jwtSecret)
		fmt.Println(tokenString, err)

		c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Login successful", "token": tokenString})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "error", "message": "Invalid username or password"})
	}
}
