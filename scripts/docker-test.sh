#!/bin/bash

# Set the environment to test.
ENV='test'

# Start the container.
. ./scripts/start.sh

# Execute the tests inside the auth container.
docker exec auth bash -c "npm run test"
