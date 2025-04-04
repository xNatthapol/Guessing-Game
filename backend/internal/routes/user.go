package routes

import (
	"github.com/gin-gonic/gin"
	UserController "github.com/xNatthapol/guessing-game/internal/controller/user"
	"github.com/xNatthapol/guessing-game/internal/middleware"
)

func addUserRoutes(r *gin.Engine) {
	r.GET("/user/profile/", middleware.AuthMiddleware(), UserController.Profile)
	r.PUT("/user/update-username/", middleware.AuthMiddleware(), UserController.UpdateUsername)
	r.DELETE("/user/delete/", middleware.AuthMiddleware(), UserController.DeleteUser)
}
