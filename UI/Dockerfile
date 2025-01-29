# Step 1: Use a Node.js image to build the project
FROM node:18 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite app
RUN npm run build

# Step 2: Use a lightweight server to serve the production build
FROM nginx:stable-alpine AS production

# Copy the build output from the builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to serve the application (default for NGINX)
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
