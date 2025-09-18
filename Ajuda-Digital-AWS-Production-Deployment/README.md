# Ajuda Digital AWS Production Deployment with Bedrock Integration

A complete production deployment of Ajuda Digital on AWS with PostgreSQL, pgvector, S3 storage, AWS Bedrock foundation models, and Google OAuth authentication.

## Architecture Overview

![Architecture diagram](../Picture/arc.drawio.svg)

This deployment uses enterprise-grade AWS services for scalability, reliability, and security:

- **Container Orchestration**: Amazon ECS with Fargate
- **Database**: Amazon RDS PostgreSQL with pgvector extension
- **File Storage**: Amazon S3
- **AI Models**: AWS Bedrock (Titan Embeddings)
- **Load Balancing**: Application Load Balancer (ALB)
- **Authentication**: Google OAuth + Email/Password
- **Networking**: VPC with security groups

## Infrastructure Components

### Core Services

- **Amazon ECS Cluster**: Container orchestration with Fargate
- **Amazon RDS**: PostgreSQL 16 with pgvector for vector operations
- **Amazon S3**: Object storage for documents and files
- **AWS Bedrock**: Foundation models for embeddings and language models
  - **Titan Embeddings G1 - Text**: 1,536 dimension embeddings
  - **Claude**: Advanced language models
  - **Llama**: Open-source language models
- **Bedrock Access Gateway**: OpenAI-compatible API proxy for Bedrock
- **Application Load Balancer**: Traffic distribution and health checks
- **Amazon ECR**: Container image registry

### Database Configuration

- **Instance**: `db.r7g.large` (2 vCPUs, 16 GB RAM) - Memory optimized
- **Storage**: 200 GB gp3 with 3,000 IOPS baseline
- **Engine**: PostgreSQL 16.10 with pgvector extension
- **Backup**: Multi-AZ deployment for high availability

### Container Configuration

- **CPU**: 1024 units (1 vCPU)
- **Memory**: 2048 MB (2 GB)
- **Platform**: AWS Fargate serverless containers
- **Auto Scaling**: Configurable based on demand

## Prerequisites

- AWS CLI configured with appropriate permissions
- Docker installed locally
- Google Cloud Console access for OAuth setup
- Domain name (optional but recommended for production)

## Environment Variables

### Required Database Configuration

```bash
DATABASE_URL=postgresql://username:encoded-password@rds-endpoint:5432/database
VECTOR_DB=pgvector
PGVECTOR_DB_URL=postgresql://username:encoded-password@rds-endpoint:5432/database
```

### Required S3 Configuration

```bash
STORAGE_PROVIDER=s3
S3_BUCKET_NAME=your-bucket-name
S3_REGION_NAME=us-east-1
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
```

### OAuth Configuration

```bash
ENABLE_OAUTH_SIGNUP=true
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://your-alb-url/oauth/google/callback
OPENID_PROVIDER_URL=https://accounts.google.com/.well-known/openid-configuration
```

### Required Bedrock Configuration

```bash
# Bedrock Integration
RAG_EMBEDDING_ENGINE=openai
RAG_OPENAI_API_BASE_URL=http://bedrock-gateway.open-webui-cluster:80/api/v1
RAG_OPENAI_API_KEY=bedrock-api-key
RAG_EMBEDDING_MODEL=amazon.titan-embed-text-v1

# Foundation Models Access
OPENAI_API_BASE_URL=http://bedrock-gateway.open-webui-cluster:80/api/v1
OPENAI_API_KEY=bedrock-api-key
```

### Important Notes

- **Password Encoding**: Special characters in database passwords must be URL-encoded

  - `(` becomes `%28`, `)` becomes `%29`, `#` becomes `%23`, `$` becomes `%24`, `+` becomes `%2B`

- **Security Groups**: RDS must allow connections from ECS security group on port 5432
- **OAuth Setup**: Google OAuth redirect URIs must match your ALB DNS name
- **Bedrock Model Access**: Must enable foundation models in Bedrock console before use
- **Bedrock Regions**: Ensure Bedrock is available in your deployment region (us-east-1)

## Deployment Steps

### 1. Prepare Infrastructure

```bash
# Configure AWS CLI
aws configure

# Create ECR repository
aws ecr create-repository --repository-name ajuda-digital --region us-east-1
```

### 2. Build and Push Container Image

```bash
# Build Docker image
docker build -t ajuda-digital:latest . --no-cache

# Tag for ECR
docker tag ajuda-digital:latest ACCOUNT-ID.dkr.ecr.us-east-1.amazonaws.com/ajuda-digital:latest

# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ACCOUNT-ID.dkr.ecr.us-east-1.amazonaws.com

# Push image
docker push ACCOUNT-ID.dkr.ecr.us-east-1.amazonaws.com/ajuda-digital:latest
```

### 3. Enable AWS Bedrock Model Access

```bash
# Enable foundation models in Bedrock console
# 1. Go to AWS Console → Amazon Bedrock → Model access
# 2. Enable the following models:
#    - Amazon Titan Text Embeddings G1
# 3. Wait for access approval (usually immediate)
```

### 4. Deploy Bedrock Access Gateway

```bash
# Create IAM policy for Bedrock access
cat > bedrock-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream",
        "bedrock:ListFoundationModels"
      ],
      "Resource": "*"
    }
  ]
}
EOF

aws iam create-policy --policy-name BedrockAccessPolicy --policy-document file://bedrock-policy.json
aws iam attach-role-policy --role-name ecsTaskRole --policy-arn arn:aws:iam::ACCOUNT-ID:policy/BedrockAccessPolicy

# Create Bedrock Access Gateway task definition
cat > bedrock-gateway-task-definition.json << EOF
{
  "family": "bedrock-gateway-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::ACCOUNT-ID:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::ACCOUNT-ID:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "bedrock-gateway",
      "image": "public.ecr.aws/bedrock-access-gateway/bedrock-access-gateway:latest",
      "portMappings": [{"containerPort": 80, "protocol": "tcp"}],
      "environment": [
        {"name": "AWS_REGION", "value": "us-east-1"},
        {"name": "API_KEY", "value": "bedrock-api-key"}
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/bedrock-gateway",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
EOF

# Create log group for Bedrock Gateway
aws logs create-log-group --log-group-name /ecs/bedrock-gateway --region us-east-1

# Register task definition and create service
aws ecs register-task-definition --cli-input-json file://bedrock-gateway-task-definition.json
aws ecs create-service --cluster open-webui-cluster --service-name bedrock-gateway-service --task-definition bedrock-gateway-task --desired-count 1 --launch-type FARGATE --network-configuration "awsvpcConfiguration={subnets=[subnet-1,subnet-2],securityGroups=[sg-bedrock],assignPublicIp=ENABLED}"
```

### 5. Create AWS Resources

```bash
# Create ECS cluster
aws ecs create-cluster --cluster-name open-webui-cluster

# Create IAM roles for ECS tasks
# Create Application Load Balancer and target groups

# Deploy ECS service
aws ecs create-service --cluster open-webui-cluster --service-name open-webui-service ...
```

### 6. Configure Database

```bash
# Install pgvector extension on RDS PostgreSQL
psql -h your-rds-endpoint -U username -d database -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

### 7. Set Up Google OAuth

1. Go to Google Cloud Console → APIs & Services → Credentials
2. Create OAuth 2.0 Client ID
3. Add authorized redirect URIs:
   - `http://your-alb-dns-name/oauth/google/callback`
4. Add authorized JavaScript origins:
   - `http://your-alb-dns-name`

## AWS Bedrock Integration

### Foundation Models Available

- **Amazon Titan Text Embeddings G1**: 1,536-dimension embeddings for enhanced RAG
- **Claude (Anthropic)**: Advanced reasoning and analysis capabilities
- **Llama (Meta)**: Open-source language models
- **Additional models**: Available based on AWS Bedrock model access

### Benefits of Bedrock Integration

- **Superior Embeddings**: Titan embeddings (1,536 dimensions) vs local models (384 dimensions)
- **Cost Efficiency**: Pay-per-use model instead of running embedding models locally
- **Scalability**: AWS-managed infrastructure handles scaling automatically
- **Model Variety**: Access to multiple foundation models through single interface
- **No Code Changes**: OpenAI-compatible API requires no Open WebUI modifications

### Bedrock Access Gateway

The [Bedrock Access Gateway](https://github.com/aws-samples/bedrock-access-gateway) serves as a proxy that:

- Wraps AWS Bedrock endpoints
- Exposes OpenAI-compatible APIs
- Handles authentication and request routing
- Provides seamless integration with Ajuda Digital

![Bedrock Conf on Ajuda Digital](../Picture/bedrock-gateway.open-webui-cluster.png)

## External AI Services Integration

In addition to AWS Bedrock, Ajuda Digital supports external AI service providers through OpenAI-compatible APIs. This allows access to additional language models and capabilities beyond what's available in AWS Bedrock.

### SeaLion AI Integration

SeaLion AI is integrated as an external provider, offering specialized language models optimized for Southeast Asian languages and contexts:

- **API Endpoint**: `https://api.sea-lion.ai/v1`
- **Authentication**: Bearer token authentication
- **Provider Type**: OpenAI-compatible
- **Use Case**: Enhanced language understanding for regional content and Tetum language support

![SeaLion Model Connection](../Picture/model_connection_from_sea-lion.png)

### Configuration for External Providers

External AI services are configured through the Open WebUI interface:

1. **Connection Type**: External
2. **API URL**: Provider-specific endpoint (e.g., `https://api.sea-lion.ai/v1`)
3. **Authentication**: Bearer token with API key
4. **Model Access**: Automatic discovery from provider's `/models` endpoint

## Security Configuration

### Network Security

- ECS tasks run in private subnets with NAT Gateway for outbound access
- RDS database in private subnets, accessible only from ECS security group
- ALB in public subnets with restricted security group rules

### Data Protection

- Database encryption at rest
- S3 bucket encryption enabled
- Secrets managed through environment variables (consider AWS Secrets Manager for production)

### Access Control

- IAM roles with least privilege principles
- Security groups with minimal required access
- Database credentials URL-encoded for secure connection strings

## Monitoring and Logging

- **Application Logs**: CloudWatch Logs group `/ecs/open-webui`
- **Load Balancer Metrics**: CloudWatch metrics for ALB
- **Database Monitoring**: RDS Performance Insights (optional)
- **Container Health**: ECS service health checks and target group health

### Performance Optimization

- **Database**: Monitor connection pooling and query performance
- **Storage**: Use S3 for file storage to reduce container storage needs
- **Caching**: Consider adding Redis for session management in multi-container deployments

## Updating the Application

### Deploy New Version

```bash
# Build new image with version tag
docker build -t ajuda-digital:v2 . --no-cache
docker tag ajuda-digital:v2 ACCOUNT-ID.dkr.ecr.us-east-1.amazonaws.com/ajuda-digital:v2
docker push ACCOUNT-ID.dkr.ecr.us-east-1.amazonaws.com/ajuda-digital:v2

# Update ECS service (rolling deployment)
aws ecs update-service --cluster open-webui-cluster --service open-webui-service --force-new-deployment
```

## Security Best Practices

- Enable AWS Config for compliance monitoring
- Use AWS Secrets Manager for sensitive configuration
- Implement least privilege IAM policies
- Enable VPC Flow Logs for network monitoring
- Regular security updates for container images

---

![Tais Traditional Pattern](../Picture/tais.png)

**Made with ❤️ in Timor-Leste 🇹🇱**
