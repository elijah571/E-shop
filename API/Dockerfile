# Use a Node.js base image
FROM node:18

# Set the working directory to where you want to run your app in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files from the local API directory into the container
COPY package*.json ./API/

# Install dependencies
RUN npm install --prefix ./API

# Copy all the files from the local API directory into the container's API directory
COPY . ./API/

# Expose port if necessary (adjust the port if you're using a different one)
EXPOSE 3000

# Start the application from the API directory
CMD ["npm", "start", "--prefix", "./API"]
