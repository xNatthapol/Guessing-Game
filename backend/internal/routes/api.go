package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"time"
)

var router = gin.Default()

// Run will start the server
func Run() {
	// Configure CORS middleware
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	getRoutes()
	router.Run(":8080")
}

func getRoutes() {
	addAuthRoutes(router)
	addGuessRoutes(router)
	addUserRoutes(router)
}
