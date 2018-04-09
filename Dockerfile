FROM node:carbon
# Set the working directory to /app
WORKDIR /app
# Copy the current directory contents into the container at /app
ADD . /app
# install node_modules for backend and frontend
RUN npm install; npm run build
# Make port 80 available to the world outside this container
EXPOSE 8080
# Run app.py when the container launches
CMD node server.js
