# Multi-stage build for React + Vite application
# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files for better caching
COPY package*.json ./

# Install all dependencies (including dev dependencies needed for build)
# Disable SSL verification to avoid certificate issues in Docker builds
RUN npm config set strict-ssl false && npm install

# Copy source code
COPY . .

# Build the application for production using local vite binary
RUN ./node_modules/.bin/vite build

# Stage 2: Serve the built application
FROM nginx:alpine AS production

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the web server
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]