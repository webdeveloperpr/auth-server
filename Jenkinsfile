pipeline {
  agent any
  environment {
    PROJECT_DIR='auth-server'
    TEMP_DIR='/tmp/auth-server'
    HOST='admin@dev.sandbox6.com'
    FROM='$(pwd)'
    PROXY='jenkins@jenkins.sandbox6.com'
    TO='admin@dev.sandbox6.com:/tmp/auth-server'
  }
  parameters {
    // Test secrets
    string(
      defaultValue: 'asdfas', 
      description: 'The JWT secret key', 
      name: 'JWT_SECRET_KEY', 
      trim: true
    ) 
    string(
      defaultValue: 'mongodb://mongo:27017/test_auth', 
      description: 'The MongoDB URL used to connect to the database.', 
      name: 'MONGO_DB_URL', 
      trim: true
    )
    string(
      defaultValue: '3010', 
      description: 'The port the application will be using to start.', 
      name: 'PORT', 
      trim: true
    )
  }
  stages {
    stage('environment') {
      steps {
        // Get the secrets from Github. Using these default to test for now.

        // Test secrets
        sh  ''' 
            echo JWT_SECRET_KEY=$JWT_SECRET_KEY >> ./env/.test.env
            echo MONGO_DB_URL=$MONGO_DB_URL >> ./env/.test.env
            echo PORT=$PORT >> ./env/.test.env
            '''
        // Dev secrets
        sh  ''' 
            echo JWT_SECRET_KEY=$JWT_SECRET_KEY >> ./env/.dev.env
            echo MONGO_DB_URL=$MONGO_DB_URL >> ./env/.dev.env
            echo PORT=$PORT >> ./env/.dev.env
            '''
        // Prod secrets
        sh  ''' 
            echo JWT_SECRET_KEY=$JWT_SECRET_KEY >> ./env/.prod.env
            echo MONGO_DB_URL=$MONGO_DB_URL >> ./env/.prod.env
            echo PORT=$PORT >> ./env/.prod.env
            '''
      }
   }
    stage('test') {
      steps {
        sh './scripts/docker-test.sh'        
      }
    }
    stage('cleanup') {
      steps {
        sh './scripts/docker-down.sh'        
      }
    }
    stage('deploy') {
      steps {
        sh """
          # Copy source files to destination via SSH.
          scp -r $FROM $TO

          ssh $HOST "mkdir -p $TEMP_DIR" &&
            ssh -tt $HOST "  
            rm -rf ~/$PROJECT_DIR;
            cp -r $TEMP_DIR ~/;
            rm -rf $TEMP_DIR;
            cd $PROJECT_DIR; 
            ./scripts/docker-up.sh;
            exit;
          "
          echo "Deployment complete!"
        """        
      }
    }
  }
  post {
    always {
      echo 'Cleaning the workspace.'
      cleanWs()
    }
    success {
      echo 'Done!'
    }
    failure {
      echo 'Done!'
    }
  }
}