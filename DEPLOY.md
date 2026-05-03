# Urli - Deployment Guide

## Architecture

| Service     | URL                                 |
| ----------- | ----------------------------------- |
| Backend API | https://api-urli.ideasprout.in      |
| Frontend    | https://urli.ideasprout.in          |
| Short links | https://urli.ideasprout.in/`<slug>` |

---

## EC2 One-Time Setup

SSH into your EC2 instance and run:

```bash
# Install Docker + Docker Compose plugin
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-plugin
sudo usermod -aG docker ubuntu
newgrp docker

# Create app directory
mkdir -p ~/urli
```

---

## GitHub Secrets Required

Go to **Settings → Secrets and variables → Actions** and add:

### Infrastructure

| Secret     | Value                                                       |
| ---------- | ----------------------------------------------------------- |
| `EC2_IP`   | Your EC2 public IP or domain                                |
| `SSH_KEY`  | Private key for `ubuntu` user (contents of `~/.ssh/id_rsa`) |
| `GHCR_PAT` | GitHub Personal Access Token with `write:packages` scope    |

### Database

| Secret              | Value                                    |
| ------------------- | ---------------------------------------- |
| `POSTGRES_PASSWORD` | Strong password for Postgres `urli` user |

### App Secrets

| Secret               | Value                                              |
| -------------------- | -------------------------------------------------- |
| `JWT_SECRET`         | 32+ char random string                             |
| `JWT_REFRESH_SECRET` | 32+ char random string (different from JWT_SECRET) |

### Email (Gmail)

| Secret               | Value                      |
| -------------------- | -------------------------- |
| `GMAIL_USER`         | your@gmail.com             |
| `GMAIL_APP_PASSWORD` | 16-char Gmail App Password |
| `GMAIL_FROM`         | `Urli <your@gmail.com>`    |

### Razorpay

| Secret                      | Value                                  |
| --------------------------- | -------------------------------------- |
| `RAZORPAY_KEY_ID`           | `rzp_live_xxxx`                        |
| `RAZORPAY_KEY_SECRET`       | Razorpay secret                        |
| `RAZORPAY_WEBHOOK_SECRET`   | Webhook secret from Razorpay dashboard |
| `RAZORPAY_PRO_PLAN_ID`      | `plan_xxxx` for Pro plan               |
| `RAZORPAY_BUSINESS_PLAN_ID` | `plan_xxxx` for Business plan          |

### Google OAuth

| Secret                 | Value                     |
| ---------------------- | ------------------------- |
| `GOOGLE_CLIENT_ID`     | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |

### App URLs

| Secret         | Value                                         |
| -------------- | --------------------------------------------- |
| `SHORT_DOMAIN` | `urli.ideasprout.in` (your short link domain) |
| `FRONTEND_URL` | `https://urli.ideasprout.in`                  |
| `ADMIN_URL`    | `https://admin.urli.ideasprout.in`            |

---

## Vercel Setup (Frontend & Admin)

1. Import `apps/frontend` and `apps/admin` as separate Vercel projects
2. Set root directory to `apps/frontend` (or `apps/admin`)
3. Add environment variables in Vercel dashboard:

```
NEXT_PUBLIC_API_URL=https://api-urli.ideasprout.in
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxx
NEXT_PUBLIC_SHORT_DOMAIN=urli.ideasprout.in
NEXT_PUBLIC_APP_URL=https://urli.ideasprout.in
```

---

## How Deployment Works

1. Push to `main` with changes under `apps/backend/**`
2. GitHub Actions:
   - Builds Docker image from `apps/backend/Dockerfile`
   - Pushes to `ghcr.io/<owner>/urli-backend:latest`
   - SCPs `docker-compose.prod.yml` to EC2 `~/urli/`
   - SSHs into EC2, writes `.env`, pulls image, recreates only the `backend` container
   - Postgres and Redis are **not** restarted - data is preserved

## Razorpay Webhook

Point Razorpay webhook to: `https://api-urli.ideasprout.in/subscriptions/webhook`

Events to enable:

- `subscription.activated`
- `subscription.cancelled`
- `subscription.expired`
