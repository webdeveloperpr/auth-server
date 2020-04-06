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
      steps {
        echo 'Deploying to prod server'
        sshPublisher(
          publishers: [
          sshPublisherDesc(
            configName: 'sandbox',
            transfers: [
            sshTransfer(
              cleanRemote: false,
              excludes: '',
              execCommand: 'cd /var/www/auth && npm install && npm run dev',
              execTimeout: 120000,
              flatten: false,
              makeEmptyDirs: true,
              noDefaultExcludes: false,
              patternSeparator: '[, ]+',
              remoteDirectory: '/auth',
              remoteDirectorySDF: false,
              removePrefix: ''
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