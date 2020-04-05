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
    stage('test') {
      steps {
        sh 'npm run test'
      }
    }
    stage('build') {
      when {
        branch 'master'
      }
      steps {
        sh 'echo Building repository'
      }
    }
    stage('store') {
      when {
        branch 'master'
      }
      steps {
        sh 'echo storing assets in S3'
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