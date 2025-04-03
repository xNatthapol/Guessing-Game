package main

import (
	"github.com/xNatthapol/guessing-game/internal/config"
	AuthController "github.com/xNatthapol/guessing-game/internal/controller/auth"
	"github.com/xNatthapol/guessing-game/internal/middleware"
	"github.com/xNatthapol/guessing-game/internal/orm"
	"github.com/xNatthapol/guessing-game/internal/routes"

	"log"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Initialize Connection
	orm.InitDB(cfg.GetDSN())

	// Initialize Auth and Middleware
	AuthController.InitAuth(cfg)
	middleware.InitMiddleware(cfg)

	routes.Run()
}
