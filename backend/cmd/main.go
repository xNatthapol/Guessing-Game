package main

import (
	"github.com/xNatthapol/guessing-game/internal/config"
	AuthController "github.com/xNatthapol/guessing-game/internal/controller/auth"
	"github.com/xNatthapol/guessing-game/internal/orm"

	"github.com/gin-contrib/cors"

	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	orm.InitDB(cfg.GetDSN())

	// Initialize Auth
	AuthController.InitAuth(cfg)

	r := gin.Default()
	r.Use(cors.Default())

	api := r.Group("/api")
	api.POST("/register", AuthController.Register)
	api.POST("/login", AuthController.Login)

	r.Run("localhost:8080")
}
