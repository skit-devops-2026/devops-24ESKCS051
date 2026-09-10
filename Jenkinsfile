pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'make install'
            }
        }

        stage('Test') {
            steps {
                sh 'make test'
            }
        }

        stage('Build') {
            steps {
                sh 'make build'
            }
        }
    }

    post {
        success {
            echo 'Zenith pipeline completed successfully.'
        }
        failure {
            echo 'Zenith pipeline failed.'
        }
    }
}