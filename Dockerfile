FROM node:20-alpine AS client-build

WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

FROM python:3.12-slim

WORKDIR /app
COPY --from=client-build /app/client/dist ./client/dist
COPY server.py .

ENV PORT=8080
ENV ZENITH_STATIC_ROOT=/app/client/dist
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD python -c "from urllib.request import urlopen; urlopen('http://127.0.0.1:8080/health')"

CMD ["python", "server.py"]