FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && \
    npm install @opentelemetry/auto-instrumentations-node

COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENV NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register"

CMD ["node", "dist/index.js"]
