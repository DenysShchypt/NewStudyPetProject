# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]



