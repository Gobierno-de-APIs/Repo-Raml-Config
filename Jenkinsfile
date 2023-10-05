pipeline {
    agent any

    environment {
        COMMITTER_EMAIL = ""
        COMMITTER_USER = ""
    }
    
    stages {
        stage('Environments') {
            steps {
                script {
                    COMMITTER_EMAIL = sh (
                          //script: 'git --no-pager show -s --format=\'%ae\'',
                          script: 'git show -s --pretty=\"%ae\"',
                          returnStdout: true
                    ).trim()
                    
                    COMMITTER_USER = sh (
                          script: 'git show -s --pretty=\"%an\"',
                          returnStdout: true
                    ).trim()
                    
                    echo "COMMITTER_EMAIL: ${env.COMMITTER_EMAIL}"

                    echo "COMMITTER_USER: ${env.COMMITTER_USER}"
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
