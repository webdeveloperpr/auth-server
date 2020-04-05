pipeline {
    agent { docker { image 'node:12.16.1' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}