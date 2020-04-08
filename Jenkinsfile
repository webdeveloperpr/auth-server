pipeline {
  agent none    
  stages {
    stage('test') {
      steps {
        sh './scripts/docker-test'
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