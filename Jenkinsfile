pipeline {
    agent { 
      docker { 
        image 'node:12.16.1' 
      } 
    }
    stages {
        stage('checkout') {
            steps {
                sh 'echo checking out repository'
            }
        }
        stage('test') {
            steps {
                sh 'echo testing repository'
            }
        }
        stage('build') {
            steps {
                sh 'echo Building repository'
            }
        }
        stage('deploy') {
            steps {
                sh 'echo deploying repository'
            }
        }
    }
}