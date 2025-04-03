package routes

import (
	"github.com/gin-gonic/gin"
	GuessController "github.com/xNatthapol/guessing-game/internal/controller/guess"
	"github.com/xNatthapol/guessing-game/internal/middleware"
)

func addGuessRoutes(rg *gin.RouterGroup) {
	guess := rg.Group("/guess", middleware.AuthMiddleware())

	guess.POST("/", GuessController.GuessNumber)
	guess.GET("/answer", GuessController.AnswerNumber)
}
