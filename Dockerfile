# Use official image
FROM oven/bun:latest
WORKDIR /app

# Install deps
COPY package.json bun.lock* ./
RUN bun install --production

# Copy source
COPY . .

# Expose Elyisa port
EXPOSE 3000

# Run server
CMD ["bun", "run", "src/index.ts"]
