# Step 1: Use official Node.js image as a base
FROM node:18

# Step 2: Install MongoDB
RUN apt-get update && apt-get install -y mongodb

# Step 3: Set the working directory in the container
WORKDIR /usr/src/app

# Step 4: Copy package.json and package-lock.json
COPY package*.json ./

# Step 5: Install the app dependencies
RUN npm install

# Step 6: Copy the rest of the application files
COPY . .

# Step 7: Expose the necessary ports
EXPOSE 3000 27017

# Step 8: Add a custom entrypoint to start MongoDB and the Node.js app
CMD ["sh", "-c", "mongod --bind_ip_all & npm start"]