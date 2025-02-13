pipeline{
    agent any
    environment{
        imagename ='nikitha125/taskeasy-frontend'
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/libexec:$PATH"
    }
    stages{
        stage('Clone from repository'){
            steps{
                checkout scmGit(
                    branches: [[name: '*/feature/backend-integrate']], 
                    extensions: [], 
                    userRemoteConfigs: [[credentialsId: 'Github', url: 'https://github.com/NikithaMedikonda/taskEasy-frontend.git']]
                )
            }
        }
        
        stage('Build Docker Image') {
            steps{
                script {
                    sh "docker build -t ${imagename} ."
                }
            }
        }

        stage('Push Docker Image'){
            steps{
                sh 'docker login -u nikitha125 -p Deseo@777'
                sh 'docker push ${imagename}'
            }
        }
        
        stage('Pull Image from docker hub'){
            steps{
                sh 'docker pull nikitha125/taskeasy-frontend'
                echo 'Image Pulled'
            }
        }
        
        stage('Delete the containers if there'){
            steps{
                sh 'docker stop taskeasy-frontend || true'
                sh 'docker rm taskeasy-frontend  || true'
            }
        }
        
        stage('Run the image'){
            steps{
                sh 'docker run -d --name taskeasy-frontend  -p 3000:3000 ${imagename}'
                echo 'Container created'
            }
        }
        
        stage('Check whether container running or not'){
            steps{
                sh 'docker ps'
               echo 'Container is running'
            }
        }
    }
}