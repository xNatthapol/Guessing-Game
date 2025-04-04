package routes

import (
	"github.com/gin-gonic/gin"
	AuthController "github.com/xNatthapol/guessing-game/internal/controller/auth"
)

func addAuthRoutes(r *gin.Engine) {
	r.POST("/register/", AuthController.Register)
	r.POST("/login/", AuthController.Login)
}
