# Base image:
FROM node:alpine

# Set working directory:
WORKDIR /app

# Copy dependency file:
COPY package.json ./

# Install dependencies:
RUN npm install

# Copy the posts directory:
COPY ./ ./

# Start the server:
CMD ["npm", "start"]