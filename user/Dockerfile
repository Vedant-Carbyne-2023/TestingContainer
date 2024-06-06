# Use the official Node.js image from Docker Hub
FROM node:18

# Set the working directory inside the container
WORKDIR /app/user

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install the dependencies
RUN npm install
RUN npm install bcryptjs


# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the application runs on
EXPOSE 8003

# Define the command to run the application
CMD ["npm", "start"]
