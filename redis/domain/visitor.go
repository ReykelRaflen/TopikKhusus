package domain

import (
	"time"
)

// Visitor represents a visitor entity
type Visitor struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Address     string    `json:"address"`
	Purpose     string    `json:"purpose"`
	CheckInTime time.Time `json:"check_in_time"`
	CheckOutTime *time.Time `json:"check_out_time,omitempty"`
}