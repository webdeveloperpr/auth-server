pipeline {
  agent any
  parameters {
    string(defaultValue: 'asdfas', description: 'The JWT secret key', name: 'JWT_SECRET_KEY', trim: false) 
    string(defaultValue: 'mongodb://mongo:27017/test_auth', description: 'The MongoDB URL used to connect to the database.', name: 'MONGO_DB_URL', trim: false)
    string(defaultValue: '3010', description: 'The port the application will be using to start.', name: 'PORT', trim: false)
  }
  stages {
    stage('environment') {
      steps {
        // Use secrets manager here in the future
        sh  ''' 
        
            echo JWT_SECRET_KEY=$JWT_SECRET_KEY >> ./env/.test.env
            echo MONGO_DB_URL=$MONGO_DB_URL >> ./env/.test.env
            echo PORT=$PORT >> ./env/.test.env
            '''
      }
   }
    stage('test') {
      steps {
        sh './scripts/docker-test.sh'
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