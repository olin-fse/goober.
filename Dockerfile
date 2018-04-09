
FROM ubuntu:16.04

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app
# Install curl and nginx
RUN apt-get update && apt-get install -y \
    curl \
    nginx
# install node, npm
RUN curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y \
    nodejs \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
RUN npm install; npm run build;

# Make port 80 available to the world outside this container
EXPOSE 8080

# Run app.py when the container launches
CMD node server.js
