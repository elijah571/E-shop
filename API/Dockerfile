# Step 1: Use an older Node.js base image
FROM node:16-buster

# Step 2: Install MongoDB 4.4
RUN apt-get update && \
    apt-get install -y wget gnupg && \
    # Add MongoDB GPG key and repository
    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg && \
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] https://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" > /etc/apt/sources.list.d/mongodb-org-4.4.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        mongodb-org=4.4.24 mongodb-org-server=4.4.24 mongodb-org-shell=4.4.24 mongodb-org-mongos=4.4.24 mongodb-org-tools=4.4.24 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Step 3: Create the MongoDB data directory
RUN mkdir -p /data/db && chown -R mongodb:mongodb /data/db

# Step 4: Create the working directory
WORKDIR /usr/src/app

# Step 6: Copy package.json and package-lock.json
COPY package*.json ./

# Step 7: Install dependencies
RUN npm ci --only=production

# Step 8: Copy application files
COPY . .

# Step 9: Expose ports
EXPOSE 5000 27017

# Step 10: Health check to ensure MongoDB is running
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s \
  CMD mongosh --eval "db.adminCommand('ping')" || exit 1

# Step 11: Start MongoDB and the app
CMD ["sh", "-c", "mongod --dbpath /data/db --bind_ip_all --logpath /var/log/mongodb/mongod.log --fork && npm start"]