package routes

import (
	"github.com/gin-gonic/gin"
	GuessController "github.com/xNatthapol/guessing-game/internal/controller/guess"
	"github.com/xNatthapol/guessing-game/internal/middleware"
)

func addGuessRoutes(r *gin.Engine) {
	r.POST("/guess/", middleware.AuthMiddleware(), GuessController.GuessNumber)
	r.GET("/guess/answer/", middleware.AuthMiddleware(), GuessController.AnswerNumber)
}
