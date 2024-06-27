# Use an official Node.js runtime as the base image
FROM node:20-alpine3.17
# Set the working directory inside the container
WORKDIR /usr/src/app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

COPY package-lock.json ./
# Install the Angular CLI globally
RUN npm install -g @angular/cli

# Install the project dependencies
RUN npm install

# Expose the port on which your Angular app runs
EXPOSE 80

# Start the Angular app
CMD ["ng", "serv e", "--host", "0.0.0.0", "--port", "80"]