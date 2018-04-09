
FROM ubuntu:16.04

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app
COPY . /data/db
# Install curl and nginx
RUN apt-get update && apt-get install -y \
    curl \
    nginx
# install mongo and start mongod
RUN \
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 && \
    echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' > /etc/apt/sources.list.d/mongodb.list && \
    apt-get update && \
    apt-get install -y mongodb-org && \
    rm -rf /var/lib/apt/lists/*
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
ENTRYPOINT service mongod start
CMD node server.js

