.PHONY: install test build run docker-build docker-up

install:
	@echo "No external dependencies required for Zenith"

test:
	python3 -m unittest discover -s tests -p "test_*.py" -v

build:
	cd client && npm ci && npm run build

run:
	python server.py

docker-build:
	docker build -t zenith:latest .

docker-up:
	docker compose up --build