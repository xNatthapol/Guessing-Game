package routes

import (
	"github.com/gin-gonic/gin"
	AuthController "github.com/xNatthapol/guessing-game/internal/controller/auth"
)

func addAuthRoutes(rg *gin.RouterGroup) {
	auth := rg.Group("/auth")

	auth.POST("/register", AuthController.Register)
	auth.POST("/login", AuthController.Login)
}
