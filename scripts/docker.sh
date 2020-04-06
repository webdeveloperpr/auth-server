#!/bin/bash

IMAGE_NAME=webdeveloperpr/auth-server

# remove stopped containers
echo Y | docker container prune

# build the container
docker build -t webdeveloperpr/auth-server .

# run the container

docker run -p 3010:3010 -d webdeveloperpr/auth-server



CONTAINER_ID=$(docker ps -a | grep webdeveloperpr/auth-server | awk '{print $1}')
docker exec -it $CONTAINER_ID /bin/bash