package routes

import (
	"github.com/gin-gonic/gin"
	UserController "github.com/xNatthapol/guessing-game/internal/controller/user"
	"github.com/xNatthapol/guessing-game/internal/middleware"
)

func addUserRoutes(rg *gin.RouterGroup) {
	user := rg.Group("/user", middleware.AuthMiddleware())

	user.GET("/profile", UserController.Profile)
	user.PUT("/update-username", UserController.UpdateUsername)
	user.DELETE("/delete", UserController.DeleteUser)
}
