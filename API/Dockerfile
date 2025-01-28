# Step 1: Use the official Node.js image as a base
FROM node:18

# Step 2: Install MongoDB dependencies
RUN apt-get update && apt-get install -y \
    gnupg \
    wget \
    curl \
    lsb-release

# Step 3: Add the MongoDB GPG key and repository
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | \
    sudo gpg -o /usr/share/keyrings/mongodb-server-4.4.gpg \
    --dearmor && echo "deb [arch=amd64] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" > /etc/apt/sources.list.d/mongodb-org-6.0.list \
    && apt-get update

# Step 4: Install MongoDB
RUN apt-get install -y mongodb-org

# Step 5: Set the working directory in the container
WORKDIR /usr/src/app

# Step 6: Copy package.json and package-lock.json
COPY package*.json ./

# Step 7: Install the app dependencies
RUN npm install

# Step 8: Copy the rest of the application files
COPY . .

# Step 9: Expose the necessary ports
EXPOSE 3000 27017

# Step 10: Start MongoDB and your Node.js app (using a background process for MongoDB)
CMD ["sh", "-c", "mongod --bind_ip_all & npm start"]
