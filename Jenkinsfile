pipeline {
  agent any
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
        sshPublisher(
          publishers: [
            sshPublisherDesc(
              configName: 'dev', 
              transfers: [
                sshTransfer(
                  cleanRemote: false, 
                  excludes: '', 
                  execCommand: 'sudo rm -rf ~/auth-server', 
                  execTimeout: 120000, 
                  flatten: false, 
                  makeEmptyDirs: false, 
                  noDefaultExcludes: false, 
                  patternSeparator: '[, ]+', 
                  remoteDirectory: '', 
                  remoteDirectorySDF: false, 
                  removePrefix: '', 
                  sourceFiles: ''
                ), 
                sshTransfer(
                  cleanRemote: false, 
                  excludes: '', 
                  execCommand: 'cd ~/auth-server && ENV=prod ./scripts/docker-up.sh ', 
                  execTimeout: 120000, 
                  flatten: false, 
                  makeEmptyDirs: false, 
                  noDefaultExcludes: false, 
                  patternSeparator: '[, ]+', 
                  remoteDirectory: '~/auth-server', 
                  remoteDirectorySDF: false, 
                  removePrefix: '', 
                  sourceFiles: '*'
                )
              ], 
              usePromotionTimestamp: false, 
              useWorkspaceInPromotion: false, 
              verbose: false
            )
          ]
        )
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