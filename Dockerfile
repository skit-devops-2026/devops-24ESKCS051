FROM python:3.12-slim

WORKDIR /app
COPY frontend ./frontend
COPY server.py .

ENV PORT=8080
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD python -c "from urllib.request import urlopen; urlopen('http://127.0.0.1:8080/health')"

CMD ["python", "server.py"]