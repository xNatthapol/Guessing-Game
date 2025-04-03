package routes

import (
	"github.com/gin-gonic/gin"
)

var router = gin.Default()

// Run will start the server
func Run() {
	getRoutes()
	router.Run(":8080")
}

func getRoutes() {
	api := router.Group("/api")
	addAuthRoutes(api)
	addUserRoutes(api)
	addGuessRoutes(api)
}
