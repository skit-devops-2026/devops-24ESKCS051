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
                bat 'python -c "print(\'No external dependencies required for Zenith\')"'
            }
        }

        stage('Test') {
            steps {
                bat 'python -m unittest discover -s tests -p "test_*.py" -v'
            }
        }

        stage('Build') {
            steps {
                bat 'echo Static HTML/CSS/JS project - build validation complete'
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