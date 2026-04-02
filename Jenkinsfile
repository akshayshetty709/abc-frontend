pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'ap-south-1'
        S3_BUCKET = 'private-frontend'
        CLOUDFRONT_DISTRIBUTION_ID = 'E2QBILELS5NOMA'
    }

    stages {
        stage('Clone Frontend Repo') {
            steps {
                git branch: 'main', 
                credentialsId: 'github-creds', 
                url: 'https://github.com/akshayshetty709/abc-frontend.git'
            }
        }

        stage('Install & Build') {
            steps {
                echo "installing"
                sh '''
                npm install
                npm run build
                '''
            }
        }

        stage('Deploy to AWS') {
            steps {
                
                withCredentials([
                    aws(credentialsId: 'AWS-CRED', 
                        accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                        secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh '''
                    echo "Uploading to S3..."
                    aws s3 sync build/ s3://$S3_BUCKET --delete
                    
                    echo "Invalidating CloudFront Cache..."
                    aws cloudfront create-invalidation \
                    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
                    --paths "/*"
                    '''
                }
            }
        }
    }
}
