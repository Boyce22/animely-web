# Backend Deployment Pattern — TSUAA

## Overview

Backend services deploy via Docker to a VPS/cloud host, using a separate workflow from the frontend (GitHub Pages). This document defines the standard pattern all TSUAA backend projects follow.

## Architecture

```
GitHub PR ──► performance-review.yml (pre-merge gate, same as frontend)
      │
      ▼  (PR approved)
  Merge to develop
      │
      ▼
  deploy-backend.yml ──► Build Docker image → Push to GHCR → Deploy to VPS
      │
      ├── Staging: develop branch → staging VPS
      └── Production: main branch → production VPS
```

## Branch-to-Environment Mapping

| Branch     | Environment | Deploy Target | Trigger              |
|------------|-------------|---------------|----------------------|
| `develop`  | Staging     | Staging VPS   | Push to `develop`    |
| `main`     | Production  | Production VPS| Push to `main`       |
| `feature/*`| (none)      | —             | CI test only         |

## Docker Setup

### Dockerfile (project root)

Standard Node.js multi-stage build for every backend project:

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Runtime stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Docker Compose (local dev)

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASS}
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d ${DB_NAME}"]
      interval: 5s

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

## CI Workflow

File: `.github/workflows/deploy-backend.yml`

### Trigger

```yaml
on:
  push:
    branches: [develop, main]
  workflow_dispatch:
```

### Jobs

| Job               | Description                                         |
|-------------------|-----------------------------------------------------|
| `check-git-flow`  | Same as frontend — main not ahead of develop        |
| `test`            | Run unit + integration tests (`npm test`)           |
| `build-and-push`  | Build Docker image, push to GHCR with branch tag    |
| `deploy`          | SSH into VPS, pull image, restart container         |

### Example (SeniorBackend implements)

```yaml
build-and-push:
  runs-on: ubuntu-latest
  needs: [check-git-flow, test]
  steps:
    - uses: actions/checkout@v4
    - name: Log in to GHCR
      run: echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin
    - name: Build and push
      run: |
        TAG=ghcr.io/${{ github.repository }}:${{ github.ref_name }}
        docker build -t $TAG .
        docker push $TAG

deploy:
  runs-on: ubuntu-latest
  needs: build-and-push
  steps:
    - name: Deploy via SSH
      uses: appleboy/ssh-action@v1
      with:
        host: ${{ secrets.VPS_HOST }}
        username: ${{ secrets.VPS_USER }}
        key: ${{ secrets.VPS_SSH_KEY }}
        script: |
          docker pull ghcr.io/${{ github.repository }}:${{ github.ref_name }}
          docker compose -f /opt/app/docker-compose.prod.yml up -d --force-recreate api
```

### Required Secrets

| Secret              | Purpose                          |
|---------------------|----------------------------------|
| `VPS_HOST`          | VPS IP or hostname               |
| `VPS_USER`          | SSH username                     |
| `VPS_SSH_KEY`       | SSH private key for deployment   |
| `GHCR_PAT`          | GitHub PAT with `packages:write` |

## Performance Gate Integration

Backend PRs use the **same** performance gate as frontend:

1. `performance-review.yml` auto-detects changes (backend files: `src/**/*.ts`, `src/**/*.js`, `Dockerfile`, `docker-compose*.yml`, `package.json`)
2. The gate blocks merge until PerfEngineer approves
3. PerfEngineer reviews: query performance (N+1), memory leaks, heavy dependencies, missing indexes, API response times

> **Note:** The current `performance-review.yml` only checks frontend file patterns. If a repo contains **both** frontend and backend code, update the file patterns to also catch backend changes (`Dockerfile`, `docker-compose*.yml`, `src/**/*.ts` excluding `*.tsx`, etc.).

## Post-Merge Verification

After a backend deploy to staging (`develop`):

1. PerfEngineer verifies the deployed API is healthy: `curl https://staging-api.example.com/health`
2. Runs a quick performance smoke test (response times, memory usage)
3. If approved, PerfEngineer creates a `release/*` PR to promote to production

## Rollback

```bash
# SSH into VPS and run:
docker compose -f /opt/app/docker-compose.prod.yml down api
docker compose -f /opt/app/docker-compose.prod.yml pull api  # pulls previous tag
docker compose -f /opt/app/docker-compose.prod.yml up -d api
```

Or redeploy a previous GitHub Actions run via `workflow_dispatch` with a specific commit SHA.
