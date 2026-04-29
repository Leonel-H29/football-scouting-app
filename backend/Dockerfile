FROM node:22-alpine AS base
WORKDIR /app

RUN apk add --no-cache openssl libc6-compat

# -----------------------------
# Dependencies stage
# -----------------------------
FROM base AS deps
COPY package*.json ./
RUN npm install

# -----------------------------
# Build stage
# -----------------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY tsconfig.json jest.config.ts ./
COPY prisma ./prisma
COPY src ./src
COPY test ./test

RUN npx prisma generate
RUN npm run build

# -----------------------------
# Runtime stage
# -----------------------------
FROM base AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev

COPY prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/index.js"]