# Step 1: Use a Node.js image to build the project
FROM node:18 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Build the Vite app
RUN yarn build

# Step 2: Use a lightweight server to serve the production build
FROM nginx:stable-alpine AS production

# Copy the build output from the builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 3000 to serve the application
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]