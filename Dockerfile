# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the backend files
COPY backend/ /app/backend/

# Set the working directory to the backend directory
WORKDIR /app/backend

# Install dependencies
RUN npm install

# Copy the frontend files
COPY frontend/ /app/frontend/

# Expose the port (3000 for this app)
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
