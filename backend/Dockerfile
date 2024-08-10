# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json from backend folder
COPY backend/package.json backend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files from backend folder to working directory
COPY backend/. .

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start:dev"]


