# Deployment evidence

## Local container

Run `docker compose up --build` from the repository root. The application is
available at `http://localhost:8080`, with health at `/health` and Prometheus
metrics at `/metrics`. Prometheus is available at `http://localhost:9090`.

## Kubernetes

Build and publish the image referenced by `k8s/deployment.yaml`, then apply the
manifests:

```bash
kubectl apply -f k8s/
kubectl get pods
kubectl port-forward service/zenith 8080:80
```

The deployment uses HTTP readiness and liveness probes against `/health`.
