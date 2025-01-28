# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .
# Install MongoDB
RUN apt-get update && apt-get install -y gnupg wget && \
    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | tee /etc/apt/trusted.gpg.d/mongodb.asc && \
    echo "deb [arch=amd64,arm64 signed-by=/etc/apt/trusted.gpg.d/mongodb.asc] https://repo.mongodb.org/apt/debian buster/mongodb-org/6.0 main" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list && \
    apt-get update && apt-get install -y mongodb-org && \
    mkdir -p /data/db && \
    rm -rf /var/lib/apt/lists/*

# Expose MongoDB's default port
EXPOSE 27017

# Expose the application's port
EXPOSE 5000

# Command to run both MongoDB and the Node.js backend
CMD ["sh", "-c", "mongod --fork --logpath /var/log/mongodb.log && node server.js"]