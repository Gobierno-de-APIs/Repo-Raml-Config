pipeline {
    agent any
    
    stages {
        stage('Environments') {
            steps {
                script {
                    def COMMITTER_EMAIL = sh (
                          //script: 'git --no-pager show -s --format=\'%ae\'',
                          script: 'git show -s --pretty=\"%ae\"',
                          returnStdout: true
                    ).trim()
                    
                    def COMMITTER_USER = sh (
                          script: 'git show -s --pretty=\"%an\"',
                          returnStdout: true
                    ).trim()
                    
                    echo "COMMITTER_EMAIL: ${COMMITTER_EMAIL}"

                    echo "COMMITTER_USER: ${COMMITTER_USER}"
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
