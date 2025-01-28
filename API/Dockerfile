# Step 1: Use the official Node.js image as a base
FROM node:18

# Step 2: Install MongoDB dependencies
RUN apt-get update && apt-get install -y \
    gnupg \
    wget \
    curl \
    lsb-release \
    && rm -rf /var/lib/apt/lists/*

# Step 3: Add the MongoDB GPG key and repository (Fixed version without sudo)
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | \
    gpg --dearmor -o /usr/share/keyrings/mongodb-server-4.4.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/mongodb-server-4.4.gpg] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" > /etc/apt/sources.list.d/mongodb-org-6.0.list \
    && apt-get update

# Step 4: Install MongoDB
RUN apt-get install -y mongodb-org \
    && rm -rf /var/lib/apt/lists/*

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

# Step 10: Create a script to start MongoDB and the Node.js app
RUN echo '#!/bin/bash\n\
mongod --bind_ip_all --fork --logpath /var/log/mongodb.log\n\
npm start' > /usr/src/app/start.sh && \
    chmod +x /usr/src/app/start.sh

# Step 11: Set the default command to run the script
CMD ["/usr/src/app/start.sh"]
