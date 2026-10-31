.PHONY: install test build run docker-build docker-up

install:
	@echo "No external dependencies required for Zenith"

test:
	python3 -m unittest discover -s tests -p "test_*.py" -v

build:
	@echo "Static HTML/CSS/JS project - build validation complete"

run:
	python server.py

docker-build:
	docker build -t zenith:latest .

docker-up:
	docker compose up --build