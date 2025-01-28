# Step 1: Use the official Node.js image as a base
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install the app dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Expose the necessary ports
EXPOSE 3000

# Step 7: Start the Node.js app
CMD ["npm", "start"]
