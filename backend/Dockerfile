# Use Node LTS
FROM node:20-slim

# Set working directory
WORKDIR /app

RUN apt-get update && apt-get install -y openssl

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy Prisma schema separately (needed before generate)
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy rest of the app
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

RUN chmod +x /app/script/docker-entrypoint.sh

# Start command
CMD ["sh", "-c", "/app/script/docker-entrypoint.sh"]