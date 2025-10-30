package main

import (
	"database/sql"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	_ "github.com/lib/pq"
	"github.com/rs/zerolog"
)

func main() {
	logger := zerolog.New(os.Stdout).With().Timestamp().Logger()

	// Connect DB
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
	dbName := os.Getenv("DB_NAME")
	connStr := "postgres://" + dbUser + ":" + dbPass + "@" + dbHost + ":5432/" + dbName + "?sslmode=disable"

	conn, err := sql.Open("postgres", connStr)
	if err != nil {
		logger.Fatal().Err(err).Msg("Failed to connect to database")
	}

	defer conn.Close()

	r := chi.NewRouter()

	r.Get("/", func(w http.ResponseWriter, _ *http.Request) {
		w.Write([]byte("Hello from Chi + Zerolog + Docker + Air 🚀"))
	})

	logger.Info().Msg("Server running at :8080 🚀")
	http.ListenAndServe(":8080", r)
}
