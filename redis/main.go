package main

import (
	"context"
	"fmt"
	"log"

	"github.com/go-redis/redis/v8"
	redisRepo "redis/repository/redis"
	"redis/usecase"
)

func main() {
	// Create a Redis client
	rdb := redis.NewClient(&redis.Options{
		Addr: "localhost:6379", // Redis server address
	})

	// Ping the Redis server
	pong, err := rdb.Ping(context.Background()).Result()
	if err != nil {
		log.Fatal("Failed to connect to Redis:", err)
	}
	fmt.Println("Connected to Redis:", pong)

	// Initialize repository and usecase
	repo := redisRepo.NewVisitorRepository(rdb)
	visitorUsecase := usecase.NewVisitorUsecase(repo)

	ctx := context.Background()

	// Example: Check in a visitor
	visitor, err := visitorUsecase.CheckInVisitor(ctx, "John Doe", "123 Main St", "Meeting")
	if err != nil {
		log.Fatal("Failed to check in visitor:", err)
	}
	fmt.Printf("Checked in visitor: %+v\n", visitor)

	// Example: Get visitor by ID
	retrieved, err := visitorUsecase.GetVisitor(ctx, visitor.ID)
	if err != nil {
		log.Fatal("Failed to get visitor:", err)
	}
	fmt.Printf("Retrieved visitor: %+v\n", retrieved)

	// Example: Check out visitor
	err = visitorUsecase.CheckOutVisitor(ctx, visitor.ID)
	if err != nil {
		log.Fatal("Failed to check out visitor:", err)
	}
	fmt.Println("Checked out visitor successfully")

	// Example: Get all visitors
	allVisitors, err := visitorUsecase.GetAllVisitors(ctx)
	if err != nil {
		log.Fatal("Failed to get all visitors:", err)
	}
	fmt.Printf("All visitors: %+v\n", allVisitors)
}