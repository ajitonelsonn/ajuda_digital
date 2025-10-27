# Open WebUI Deployment to Amazon ECS - Guide

This guide covers deploying Open WebUI container to Amazon ECS with PostgreSQL (pgvector), S3 storage, and Google OAuth authentication.

## Prerequisites

- AWS CLI installed and configured
- Docker installed
- Open WebUI Docker image built locally
- AWS RDS PostgreSQL instance with pgvector extension
- S3 bucket for file storage
- Google OAuth credentials

## Architecture Overview

- **Compute**: Amazon ECS with Fargate
- **Database**: AWS RDS PostgreSQL with pgvector extension
- **Storage**: Amazon S3
- **Load Balancer**: Application Load Balancer
- **Authentication**: Google OAuth + Email/Password

## Step 1: Configure AWS CLI

```bash
# Configure AWS credentials
aws configure
# Enter your:
# - AWS Access Key ID
# - AWS Secret Access Key
# - Default region: us-east-1
# - Default output format: json
```

## Step 2: Create ECR Repository and Push Image

```bash
# Create ECR repository
aws ecr create-repository --repository-name ajuda-digital --region us-east-1

# Get your account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Tag and push your image
docker tag ajuda-digital:latest $ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/ajuda-digital:latest
docker push $ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/ajuda-digital:latest
```

## Step 3: Create IAM Roles

```bash
# Create trust policy
cat > ecs-task-trust-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

# Create execution role
aws iam create-role --role-name ecsTaskExecutionRole --assume-role-policy-document file://ecs-task-trust-policy.json
aws iam attach-role-policy --role-name ecsTaskExecutionRole --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

# Create task role for S3 access
aws iam create-role --role-name ecsTaskRole --assume-role-policy-document file://ecs-task-trust-policy.json

# Create S3 access policy
cat > s3-access-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    }
  ]
}
EOF

# Attach S3 policy
aws iam create-policy --policy-name OpenWebUIS3Access --policy-document file://s3-access-policy.json
aws iam attach-role-policy --role-name ecsTaskRole --policy-arn arn:aws:iam::$ACCOUNT_ID:policy/OpenWebUIS3Access
```

## Step 4: Create ECS Cluster

```bash
# Create service-linked role if it doesn't exist (may return error if exists)
aws iam create-service-linked-role --aws-service-name ecs.amazonaws.com

# Create ECS cluster
aws ecs create-cluster --cluster-name open-webui-cluster
```

## Step 5: Create Task Definition

**Important**: URL-encode special characters in your database password:

- `(` becomes `%28`
- `)` becomes `%29`
- `$` becomes `%24`
- `+` becomes `%2B`

```bash
# Create task definition file
cat > task-definition.json << EOF
{
  "family": "open-webui-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "executionRoleArn": "arn:aws:iam::$ACCOUNT_ID:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::$ACCOUNT_ID:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "open-webui",
      "image": "$ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/ajuda-digital:latest",
      "portMappings": [
        {
          "containerPort": 8080,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {"name": "DATABASE_URL", "value": "postgresql://username:URL_ENCODED_PASSWORD@your-rds-endpoint:5432/database_name"},
        {"name": "VECTOR_DB", "value": "pgvector"},
        {"name": "PGVECTOR_DB_URL", "value": "postgresql://username:URL_ENCODED_PASSWORD@your-rds-endpoint:5432/database_name"},
        {"name": "STORAGE_PROVIDER", "value": "s3"},
        {"name": "S3_BUCKET_NAME", "value": "your-bucket-name"},
        {"name": "S3_REGION_NAME", "value": "us-east-1"},
        {"name": "S3_ACCESS_KEY_ID", "value": "your-access-key-id"},
        {"name": "S3_SECRET_ACCESS_KEY", "value": "your-secret-access-key"},
        {"name": "ENABLE_OAUTH_SIGNUP", "value": "true"},
        {"name": "GOOGLE_CLIENT_ID", "value": "your-google-client-id.apps.googleusercontent.com"},
        {"name": "GOOGLE_CLIENT_SECRET", "value": "your-google-client-secret"},
        {"name": "OPENID_PROVIDER_URL", "value": "https://accounts.google.com/.well-known/openid-configuration"},
        {"name": "WEBUI_URL", "value": "http://your-alb-dns-name"},
        {"name": "GOOGLE_REDIRECT_URI", "value": "http://your-alb-dns-name/oauth/google/callback"},
        {"name": "CORS_ALLOW_ORIGIN", "value": "*"}
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/open-webui",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
EOF

# Create CloudWatch log group
aws logs create-log-group --log-group-name /ecs/open-webui --region us-east-1

# Register task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json
```

## Step 6: Create Application Load Balancer

```bash
# Get VPC and subnet information
VPC_ID=$(aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query 'Vpcs[0].VpcId' --output text)
SUBNET_1=$(aws ec2 describe-subnets --filters "Name=vpc-id,Values=$VPC_ID" --query 'Subnets[0].SubnetId' --output text)
SUBNET_2=$(aws ec2 describe-subnets --filters "Name=vpc-id,Values=$VPC_ID" --query 'Subnets[1].SubnetId' --output text)

# Create security group for ALB
ALB_SG=$(aws ec2 create-security-group --group-name open-webui-alb-sg --description "Open WebUI ALB Security Group" --vpc-id $VPC_ID --query 'GroupId' --output text)

# Allow HTTP/HTTPS traffic to ALB
aws ec2 authorize-security-group-ingress --group-id $ALB_SG --protocol tcp --port 80 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id $ALB_SG --protocol tcp --port 443 --cidr 0.0.0.0/0

# Create ALB
ALB_ARN=$(aws elbv2 create-load-balancer --name open-webui-alb --subnets $SUBNET_1 $SUBNET_2 --security-groups $ALB_SG --query 'LoadBalancers[0].LoadBalancerArn' --output text)

# Create target group
TG_ARN=$(aws elbv2 create-target-group --name open-webui-tg --protocol HTTP --port 8080 --vpc-id $VPC_ID --target-type ip --health-check-path / --query 'TargetGroups[0].TargetGroupArn' --output text)

# Create ALB listener
aws elbv2 create-listener --load-balancer-arn $ALB_ARN --protocol HTTP --port 80 --default-actions Type=forward,TargetGroupArn=$TG_ARN
```

## Step 7: Configure Network Security

```bash
# Create security group for ECS tasks
ECS_SG=$(aws ec2 create-security-group --group-name open-webui-ecs-sg --description "Open WebUI ECS Security Group" --vpc-id $VPC_ID --query 'GroupId' --output text)

# Allow traffic from ALB to ECS tasks
aws ec2 authorize-security-group-ingress --group-id $ECS_SG --protocol tcp --port 8080 --source-group $ALB_SG

# Get RDS security group and allow ECS access
RDS_SG=$(aws rds describe-db-instances --db-instance-identifier your-db-identifier --query 'DBInstances[0].VpcSecurityGroups[0].VpcSecurityGroupId' --output text)
aws ec2 authorize-security-group-ingress --group-id $RDS_SG --protocol tcp --port 5432 --source-group $ECS_SG
```

## Step 8: Create ECS Service

```bash
# Create ECS service
aws ecs create-service \
  --cluster open-webui-cluster \
  --service-name open-webui-service \
  --task-definition open-webui-task \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[$SUBNET_1,$SUBNET_2],securityGroups=[$ECS_SG],assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=$TG_ARN,containerName=open-webui,containerPort=8080"
```

## Step 9: Get Application URL

```bash
# Get ALB DNS name
ALB_DNS=$(aws elbv2 describe-load-balancers --load-balancer-arns $ALB_ARN --query 'LoadBalancers[0].DNSName' --output text)
echo "Application URL: http://$ALB_DNS"
```

## Step 10: Configure Google OAuth

1. Go to Google Cloud Console → APIs & Services → Credentials
2. Update your OAuth client with:
   - **Authorized JavaScript origins**: `http://your-alb-dns-name`
   - **Authorized redirect URIs**: `http://your-alb-dns-name/oauth/google/callback`

## Monitoring and Troubleshooting

### Check Service Status

```bash
# Check service status
aws ecs describe-services --cluster open-webui-cluster --services open-webui-service --query 'services[0].runningCount'

# Check task status
aws ecs list-tasks --cluster open-webui-cluster --service-name open-webui-service

# Check target health
aws elbv2 describe-target-health --target-group-arn $TG_ARN
```

### View Logs

```bash
# Get task ID
TASK_ID=$(aws ecs list-tasks --cluster open-webui-cluster --service-name open-webui-service --query 'taskArns[0]' --output text | cut -d'/' -f3)

# View logs
aws logs get-log-events --log-group-name /ecs/open-webui --log-stream-name ecs/open-webui/$TASK_ID --limit 50
```

## Updating Your Application

### Push New Image Version

```bash
# Build new version
docker build -t ajuda-digital:v2 . --no-cache

# Tag and push
docker tag ajuda-digital:v2 $ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/ajuda-digital:v2
docker push $ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/ajuda-digital:v2

# Force new deployment
aws ecs update-service --cluster open-webui-cluster --service open-webui-service --force-new-deployment
```

## Common Issues and Solutions

### Database Connection Issues

- Ensure password is URL-encoded in DATABASE_URL
- Verify RDS security group allows ECS security group access on port 5432
- Check RDS instance is publicly accessible if needed

### Health Check Failures

- Verify application starts without errors in logs
- Ensure container listens on port 8080
- Check security group rules allow ALB to reach ECS tasks

### OAuth Errors

- Update Google OAuth redirect URIs to match ALB DNS name
- Set WEBUI_URL and GOOGLE_REDIRECT_URI environment variables correctly

## Security Considerations

- Use AWS Secrets Manager for sensitive environment variables
- Enable HTTPS with SSL certificate for production
- Restrict CORS_ALLOW_ORIGIN to specific domains
- Use private subnets for ECS tasks in production
- Enable AWS CloudTrail for audit logging

## Cost Optimization

- Use Fargate Spot for non-production workloads
- Configure auto-scaling based on CPU/memory utilization
- Use smaller instance sizes if sufficient for your workload
- Enable container insights for better monitoring
