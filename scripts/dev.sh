#!/bin/bash
. ./scripts/core.sh

# We export this so that the dockerfile can load the correc env.

# Remove Previous Stack
docker-compose -p $COMPOSE_ID rm -f

# Starting new stack environment
# --detach runs the container in the bg
docker-compose -p $COMPOSE_ID up
