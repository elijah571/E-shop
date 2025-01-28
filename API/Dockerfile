# Use a Node.js base image
FROM node:18

# Set the working directory to the 'API' folder
WORKDIR /usr/src/app/API

# Copy the package.json and package-lock.json files
COPY API/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY API ./

# Expose port if necessary (adjust the port if you're using a different one)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
