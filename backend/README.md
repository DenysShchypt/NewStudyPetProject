<!-- 
# Base image
FROM node:16 AS builder

# Create app directory
WORKDIR /backend

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install --timeout=600000

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npx prisma generate
RUN npm run build
EXPOSE 4000
# Start the server using the production build
CMD ["npm", "run", "start:dev"] -->