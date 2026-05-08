FROM node:20-alpine AS builder
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY server/ ./server/
EXPOSE 3000
CMD ["node", "server/index.js"]
