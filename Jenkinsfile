pipeline {
    agent { 
      docker { 
        image 'node:12.16.1' 
      } 
    }
    stages {
        stage('checkout') {
            steps {
                sh 'checking out repository'
            }
        }
        stage('test') {
            steps {
                sh 'testing repository'
            }
        }
        stage('build') {
            steps {
                sh 'Building repository'
            }
        }
        stage('deploy') {
            steps {
                sh 'deploying repository'
            }
        }
    }
}