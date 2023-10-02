pipeline {
    agent any

    environment {
        GIT_REPO_RAML = ""
        REPO_CONFIG = ""
        REPO_RAML = ""
        FILENAME_RAML = ""
        FILENAME_HTML = ""
        FILENAME_ERROR = ""
    }

    stages {
        stage('Environments') {
            steps {
                script {
                    variables_repositorios("CONFIG", "${env.REPO_GIT_CONFIG}")
                }
            }
        }

        stage('Clonar Repositorios') {
            steps {
                script {
                    clone_repositorios("CONFIG")
                    clone_repositorios("SAVE")
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'ls'
                    sh 'pwd'
                }
            }
        }
    }
    post {
        success {
            //enviar_email("SUCCESS")
            cleanWs()
        }

        failure {
            //enviar_email("FAILURE")
            cleanWs()
        }
    }
}

def variables_repositorios(def config = "", def repo = "") {
    script {
        String url_repositorio = repo;
        String[] repositorio = url_repositorio.split('/');
        String repositorio_name = repositorio[repositorio.length-1];

        if (repositorio_name.endsWith('.git')) repositorio_name = repositorio_name.substring(0, repositorio_name.length()-4);

        if ( config.equals("CONFIG") ) {
            REPO_CONFIG = repositorio_name
        } else {
            GIT_REPO_RAML = repo
            REPO_RAML = repositorio_name
            FILENAME_RAML = "${repositorio_name.toLowerCase()}.raml"
            FILENAME_HTML = "${repositorio_name.toLowerCase()}.html"
            FILENAME_ERROR = "error-${repositorio_name.toLowerCase()}-${currentBuild.number}.txt"
        }
    }
}

def clone_repositorios(def config = "") {
    script {
        if ( config.equals("CONFIG") ) {
            sh "git clone ${env.REPO_GIT_CONFIG}"
            sh "chmod -R 777 ${REPO_CONFIG}"
        } else if ( config.equals("RAML") ) {
            sh "git clone -b ${params.BRANCH_RAML} ${GIT_REPO_RAML}"
        } else {
            sh "git clone -b ${params.BRANCH_HTML} ${env.REPO_GIT_SAVE_RAML}"
        }
    }
}

def validar_archivos_raml() {
    script {
        sh "node ./${REPO_CONFIG}/${env.RAML2HTML_SCRIPT}"
        sh "./${REPO_CONFIG}/${env.RAML2HTML_VALIDATE}"
    }
}

def guardar_archivos_html() {
    script {
        withCredentials([usernamePassword(credentialsId: 'GitHub_Credentials', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
            sh script: '''
                cp -f ./${FILENAME_HTML} ./apis_raml_html
                cd ./apis_raml_html
                git add ${FILENAME_HTML}
                git commit -m "Jenkins Pipeline: ${JOB_NAME} - Triggered Build: ${BUILD_NUMBER}"
                git push -u https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${GIT_USERNAME}/apis_raml_html.git
            '''
        }
    }
}

def enviar_email(def status = "") {
    script {
        if ( status.equals("SUCCESS") ) {
            archiveArtifacts artifacts: '*.html', onlyIfSuccessful: true

            emailext to: "${env.EMAIL_VALIDATION_APIS}",
                subject: "Build: ${currentBuild.currentResult} - Jenkins Pipeline: ${env.JOB_NAME}",
                body: "<strong>${currentBuild.currentResult}:</strong> ${env.JOB_NAME}<br /><br /><strong>Build Number:</strong> ${env.BUILD_NUMBER}<br /><br />Para más información sobre la ejecución del pipeline, puedes revisar en la siguiente URL: ${env.BUILD_URL}<br /><br />El archivo generado se guardo en el siguiente repositorio: ${env.REPO_GIT_SAVE_RAML}",
                attachmentsPattern: '*.html'
        } else {
            archiveArtifacts artifacts: '**/*.txt', onlyIfSuccessful: false

            emailext to: "${env.EMAIL_VALIDATION_APIS}",
                subject: "Build: ${currentBuild.currentResult} - Jenkins Pipeline: ${env.JOB_NAME}",
                body: "<strong>${currentBuild.currentResult}:</strong> ${env.JOB_NAME}<br /><br /><strong>Build Number:</strong> ${env.BUILD_NUMBER}<br /><br />Para más información sobre la ejecución del pipeline, puedes revisar en la siguiente URL: ${env.BUILD_URL}"
        }
    }
}