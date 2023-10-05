pipeline {
    agent any

    stages {
        stage('Environments') {
            steps {
                script {
                    def COMMITTER_EMAIL = bat(
                        script: "git --no-pager show -s --format='%%ae'",
                        returnStdout: true).split('\r\n')[2].trim() 
                        echo "COMMITTER_EMAIL: ${COMMITTER_EMAIL}"
                    
                    sh 'echo "${GIT_URL}"'
                    sh 'echo "${GIT_BRANCH}"'
                    sh 'echo "${GIT_COMMIT}"'
                    sh 'echo "${GIT_PREVIOUS_COMMIT}"'
                    sh 'echo "${GIT_AUTHOR_EMAIL}"'
                    sh 'echo "${GIT_AUTHOR_NAME}"'
                    sh 'echo "${GIT_COMMITTER_EMAIL}"'
                    sh 'echo "${GIT_COMMITTER_NAME}"'
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
