# Zenith

## Author

| Roll No.   | Name         | GitHub username    |
| ---------- | ------------ | ------------------ |
| 24ESKCS051 | Ankit Sharma | ankit-sharma-cyber |

## About

Zenith is a college management website designed to manage and organize college resources such as classes, laboratories, and auditoriums. It provides a web-based interface to make college resource management more convenient and accessible.

## Tech stack

- Frontend: HTML, CSS, JavaScript, React
- Runtime: Python standard-library HTTP server
- Monitoring: Prometheus-compatible `/metrics` endpoint

## Running locally

```bash
make install
make run
```

The container serves the frontend on port 8080 and exposes `/health` and
`/metrics` for deployment checks. Start the application and Prometheus with:

```bash
docker compose up --build
```

## Live URL

Local deployment: http://localhost:8080

For a public deployment, replace this URL with the address assigned by the
chosen hosting provider.

## Health endpoint

`GET /health` returns the running commit SHA. See `Makefile` and the milestone sheet for why this is required.
