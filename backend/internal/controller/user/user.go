package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/xNatthapol/guessing-game/internal/orm"
)

type UpdateUsernameRequest struct {
	NewUsername string `json:"newUsername"`
}

func Profile(c *gin.Context) {
	userID := c.MustGet("userId").(float64)
	var user orm.User
	if err := orm.Db.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Profile fetched successfully", "user": user})
}

func UpdateUsername(c *gin.Context) {
	userID := c.MustGet("userId").(float64)
	var request UpdateUsernameRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	var user orm.User
	if err := orm.Db.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	user.Username = request.NewUsername
	orm.Db.Save(&user)
	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Username updated successfully"})
}

func DeleteUser(c *gin.Context) {
	userID := c.MustGet("userId").(float64)

	if err := orm.Db.Delete(&orm.User{}, userID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "User deleted successfully"})
}
