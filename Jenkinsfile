pipeline {
  agent {
    docker {
      image 'node:lts-stretch'
    }
  }
  environment {
    HOME = '.'
  }
  stages {
    stage('install') {
      steps {
        sh 'npm install'
      }
    }
    stage('deploy') {
      when {
        branch 'master'
      }
      steps {
        echo 'Deploying to prod server'
      }
    }
  }
  post {
    always {
      echo 'Done!'
    }
    success {
      echo 'Done!'
    }
    failure {
      echo 'Done!'
    }
  }
}