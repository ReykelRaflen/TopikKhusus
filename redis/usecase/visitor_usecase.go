package usecase

import (
	"context"
	"time"

	"github.com/google/uuid"
	"redis/domain"
	"redis/repository/redis"
)

// VisitorUsecase defines business logic for visitor management
type VisitorUsecase struct {
	repo redis.VisitorRepository
}

// NewVisitorUsecase creates a new visitor usecase
func NewVisitorUsecase(repo redis.VisitorRepository) *VisitorUsecase {
	return &VisitorUsecase{repo: repo}
}

// CheckInVisitor checks in a new visitor
func (u *VisitorUsecase) CheckInVisitor(ctx context.Context, name, address, purpose string) (*domain.Visitor, error) {
	visitor := &domain.Visitor{
		ID:          uuid.New().String(),
		Name:        name,
		Address:     address,
		Purpose:     purpose,
		CheckInTime: time.Now(),
	}
	err := u.repo.Save(ctx, visitor)
	return visitor, err
}

// CheckOutVisitor checks out a visitor
func (u *VisitorUsecase) CheckOutVisitor(ctx context.Context, id string) error {
	visitor, err := u.repo.FindByID(ctx, id)
	if err != nil {
		return err
	}
	now := time.Now()
	visitor.CheckOutTime = &now
	return u.repo.Update(ctx, visitor)
}

// GetVisitor retrieves a visitor by ID
func (u *VisitorUsecase) GetVisitor(ctx context.Context, id string) (*domain.Visitor, error) {
	return u.repo.FindByID(ctx, id)
}

// GetAllVisitors retrieves all visitors
func (u *VisitorUsecase) GetAllVisitors(ctx context.Context) ([]*domain.Visitor, error) {
	return u.repo.FindAll(ctx)
}

// DeleteVisitor removes a visitor
func (u *VisitorUsecase) DeleteVisitor(ctx context.Context, id string) error {
	return u.repo.Delete(ctx, id)
}