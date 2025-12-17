# Personal Website API

A Node.js TypeScript API for my personal website.

## Features

- RESTful API built with Express
- TypeScript for type safety
- Docker support
- Automated deployment via GitHub Actions
- HashiCorp Vault integration for secrets management

## Development

### Prerequisites

- Node.js 20+
- Docker (optional)

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Building

```bash
npm run build
npm start
```

## API Endpoints

- `GET /api/data` - Returns static mock data

## Deployment

This project uses GitHub Actions to automatically build and deploy to DigitalOcean when pushing to the `main` branch.

### Required Secrets

Configure these in your GitHub repository secrets:
- `VAULT_ADDR` - HashiCorp Vault server URL
- `VAULT_ROLE_ID` - Vault AppRole role ID
- `VAULT_SECRET_ID` - Vault AppRole secret ID

### Vault Configuration

Store these secrets in HashiCorp Vault:

**kv/data/shared:**
- `dockerhub-username`
- `dockerhub-access-token`

**kv/data/api:**
- `droplet-ip`
- `ssh-key`

## Docker

Build and run with Docker:

```bash
docker build -t personal-website-api .
docker run -p 3000:3000 personal-website-api
```

Or use docker-compose:

```bash
docker compose up -d
```
