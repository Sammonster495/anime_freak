# Set the base image
FROM node:21-alpine

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# set environment variable
ARG REACT_APP_SUPABASE_URL=""
ARG REACT_APP_ANON_KEY=""

ENV REACT_APP_SUPABASE_URL=$REACT_APP_SUPABASE_URL
ENV REACT_APP_ANON_KEY=$REACT_APP_ANON_KEY

# Expose the port
EXPOSE 5000

# Start the application
CMD ["node", "./src/api/index.js"]