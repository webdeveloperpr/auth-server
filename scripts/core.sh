# Id if the container
COMPOSE_ID=auth

# Gets the enviroment variables from the configuration passed
function getEnvFile() {
  # environemnts
  DEV_ENV="dev"
  PROD_ENV="prod"
  TEST_ENV="test"

  # paths
  ENV_DIR="./env/"

  # environment files
  DEV_ENV_FILE="${ENV_DIR}.dev.env"
  PROD_ENV_FILE="${ENV_DIR}.prod.env"
  TEST_ENV_FILE="${ENV_DIR}.test.env"
  # default env
  ENV_FILE=DEV_ENV

  if [[ $ENV = $PROD_ENV ]] && [[ -e $PROD_ENV_FILE ]]; then
    ENV_FILE=$PROD_ENV_FILE
    echo "loading prod env"
  elif [[ $ENV = $TEST_ENV ]] && [[ -e $TEST_ENV_FILE ]]; then
    ENV_FILE=$TEST_ENV_FILE
    echo "loading test env"
  elif [[ -e $DEV_ENV_FILE ]]; then
    ENV_FILE=$DEV_ENV_FILE
    echo "loading dev env"
  else
    echo "No environment file found."
  fi
}

getEnvFile

# We must export this variable so that Docker can read use it in docker-compose
export ENV_FILE
