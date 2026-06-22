pipeline {
    agent any

    stages {
        stage('1. Descargar Repositorio') {
            steps {
                checkout scm
            }
        }

        stage('2. Control de Integridad') {
            steps {
                sh 'test -f index.html && test -f script.js'
                echo 'Estructura web verificada con éxito.'
            }
        }

        stage('3. Empaquetar con Docker') {
            steps {
                sh 'docker build -t taskflow-app:latest .'
            }
        }
    }
}