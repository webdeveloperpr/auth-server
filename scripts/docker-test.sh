#!/bin/bash

# Set the environment to test.
ENV='test'

# Start the container.
. ./scripts/docker-up.sh

# Execute the tests inside the auth container.
docker exec -it auth bash -c "npm run test"
