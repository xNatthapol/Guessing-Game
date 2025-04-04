package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var router = gin.Default()

// Run will start the server
func Run() {
	// Configure CORS middleware
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	getRoutes()
	router.Run(":8080")
}

func getRoutes() {
	api := router.Group("/api")
	addAuthRoutes(api)
	addUserRoutes(api)
	addGuessRoutes(api)
}
