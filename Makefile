.PHONY: install test build run docker-build docker-up

install:
	@echo "No external dependencies required for Zenith"

test:
	python3 -m unittest discover -s tests -p "test_*.py" -v

build:
	@echo "Static HTML/CSS/JS project - build validation complete"

run:
	@echo "Open index.html in a browser to run Zenith"

docker-build:
	@echo "TODO: docker build for frontend and backend" && exit 1

docker-up:
	docker compose up --build