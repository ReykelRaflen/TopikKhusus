package redis

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/go-redis/redis/v8"
	"redis/domain"
)

// VisitorRepository interface defines methods for visitor data access
type VisitorRepository interface {
	Save(ctx context.Context, visitor *domain.Visitor) error
	FindByID(ctx context.Context, id string) (*domain.Visitor, error)
	FindAll(ctx context.Context) ([]*domain.Visitor, error)
	Update(ctx context.Context, visitor *domain.Visitor) error
	Delete(ctx context.Context, id string) error
}

// visitorRepositoryImpl implements VisitorRepository using Redis
type visitorRepositoryImpl struct {
	client *redis.Client
}

// NewVisitorRepository creates a new visitor repository
func NewVisitorRepository(client *redis.Client) VisitorRepository {
	return &visitorRepositoryImpl{client: client}
}

// Save stores a visitor in Redis
func (r *visitorRepositoryImpl) Save(ctx context.Context, visitor *domain.Visitor) error {
	key := fmt.Sprintf("visitor:%s", visitor.ID)
	data, err := json.Marshal(visitor)
	if err != nil {
		return err
	}
	return r.client.Set(ctx, key, data, 24*time.Hour).Err() // Expire after 24 hours
}

// FindByID retrieves a visitor by ID
func (r *visitorRepositoryImpl) FindByID(ctx context.Context, id string) (*domain.Visitor, error) {
	key := fmt.Sprintf("visitor:%s", id)
	data, err := r.client.Get(ctx, key).Result()
	if err != nil {
		if err == redis.Nil {
			return nil, fmt.Errorf("visitor not found")
		}
		return nil, err
	}
	var visitor domain.Visitor
	err = json.Unmarshal([]byte(data), &visitor)
	return &visitor, err
}

// FindAll retrieves all visitors
func (r *visitorRepositoryImpl) FindAll(ctx context.Context) ([]*domain.Visitor, error) {
	keys, err := r.client.Keys(ctx, "visitor:*").Result()
	if err != nil {
		return nil, err
	}
	visitors := make([]*domain.Visitor, 0, len(keys))
	for _, key := range keys {
		data, err := r.client.Get(ctx, key).Result()
		if err != nil {
			continue // Skip if error
		}
		var visitor domain.Visitor
		if err := json.Unmarshal([]byte(data), &visitor); err == nil {
			visitors = append(visitors, &visitor)
		}
	}
	return visitors, nil
}

// Update updates a visitor
func (r *visitorRepositoryImpl) Update(ctx context.Context, visitor *domain.Visitor) error {
	return r.Save(ctx, visitor)
}

// Delete removes a visitor
func (r *visitorRepositoryImpl) Delete(ctx context.Context, id string) error {
	key := fmt.Sprintf("visitor:%s", id)
	return r.client.Del(ctx, key).Err()
}