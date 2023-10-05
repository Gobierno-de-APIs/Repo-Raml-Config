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
                    
                    echo "COMMITTER_EMAIL: ${COMMITTER_EMAIL}"

                    def COMMITTER_USER = sh (
                          script: 'git show -s --pretty=\"%an\"',
                          returnStdout: true
                    ).trim()
                    
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

def guardar_archivos_html() {
    script {
        withCredentials([usernamePassword(credentialsId: 'GitHub_Credentials', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
            sh script: '''
                cp -f ./${FILENAME_HTML} ./apis_raml_html
                cd ./apis_raml_html
                git add ${FILENAME_HTML}
                git commit -m "Jenkins Pipeline: ${JOB_NAME} - Build: ${BUILD_NUMBER}"
                git push -u https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${GIT_USERNAME}/apis_raml_html.git
            '''
        }
    }
}
