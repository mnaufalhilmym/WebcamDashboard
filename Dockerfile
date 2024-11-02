FROM node:22-bookworm-slim AS build-base

FROM build-base AS deps
WORKDIR /app
COPY package.json .
RUN npm i

FROM build-base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env.prod ./.env
RUN npm run build

FROM gcr.io/distroless/nodejs22-debian12
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["server.js"]