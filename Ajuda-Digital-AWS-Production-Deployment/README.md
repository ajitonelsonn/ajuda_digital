# Ajuda Digital AWS Production Deployment

A complete production deployment of Ajuda Digital on AWS with PostgreSQL, pgvector, S3 storage, and Google OAuth authentication.

## Architecture Overview

```mermaid
graph TB
    subgraph "Internet"
        Users[👥 Users]
        Google[🔐 Google OAuth]
    end

    subgraph "AWS Cloud - us-east-1"
        subgraph "VPC - Virtual Private Cloud"
            subgraph "Public Subnets"
                ALB[⚖️ Application Load Balancer<br/>open-webui-alb-1494444724.us-east-1.elb.amazonaws.com]
                NAT[🌐 NAT Gateway]
            end

            subgraph "Private Subnets - ECS"
                subgraph "ECS Cluster"
                    subgraph "Fargate Tasks"
                        Task1[📦 Open WebUI Container<br/>CPU: 1024, Memory: 2GB<br/>Port: 8080]
                        Task2[📦 Open WebUI Container<br/>CPU: 1024, Memory: 2GB<br/>Port: 8080]
                    end
                end
            end

            subgraph "Private Subnets - Database"
                RDS[(🗄️ Amazon RDS PostgreSQL 16<br/>db.r7g.large<br/>Multi-AZ: us-east-1c, us-east-1f<br/>pgvector extension)]
            end
        end

        subgraph "Container Registry"
            ECR[📋 Amazon ECR<br/>ajuda-digital:latest<br/>225959949345.dkr.ecr.us-east-1.amazonaws.com]
        end

        subgraph "Object Storage"
            S3[🪣 Amazon S3<br/>openwebui-ajudadigital<br/>Documents & Files]
        end

        subgraph "Monitoring & Logs"
            CloudWatch[📊 CloudWatch Logs<br/>/ecs/open-webui]
            ALBLogs[📈 ALB Access Logs]
        end

        subgraph "Security Groups"
            ALBSG[🛡️ ALB Security Group<br/>HTTP: 80, HTTPS: 443<br/>Source: 0.0.0.0/0]
            ECSSG[🛡️ ECS Security Group<br/>Port: 8080<br/>Source: ALB SG]
            RDSSG[🛡️ RDS Security Group<br/>PostgreSQL: 5432<br/>Source: ECS SG]
        end
    end

    %% User Flow
    Users -->|HTTP/HTTPS| ALB
    Users -->|OAuth Flow| Google
    Google -->|OAuth Callback| ALB

    %% Load Balancer to Containers
    ALB -->|Health Check & Traffic| Task1
    ALB -->|Health Check & Traffic| Task2

    %% Container Dependencies
    Task1 -->|Database Queries<br/>pgvector operations| RDS
    Task2 -->|Database Queries<br/>pgvector operations| RDS

    Task1 -->|File Upload/Download| S3
    Task2 -->|File Upload/Download| S3

    Task1 -->|Pull Images| ECR
    Task2 -->|Pull Images| ECR

    Task1 -->|Internet Access| NAT
    Task2 -->|Internet Access| NAT

    %% Logging
    Task1 -->|Application Logs| CloudWatch
    Task2 -->|Application Logs| CloudWatch
    ALB -->|Access Logs| ALBLogs

    %% Security Groups
    ALBSG -.->|Protects| ALB
    ECSSG -.->|Protects| Task1
    ECSSG -.->|Protects| Task2
    RDSSG -.->|Protects| RDS

    %% Environment Variables
    subgraph "Configuration"
        ENV[⚙️ Environment Variables<br/>DATABASE_URL: PostgreSQL connection<br/>VECTOR_DB: pgvector<br/>S3_BUCKET_NAME: openwebui-ajudadigital<br/>GOOGLE_CLIENT_ID: OAuth credentials<br/>CORS_ALLOW_ORIGIN: *]
    end

    Task1 -.->|Uses| ENV
    Task2 -.->|Uses| ENV

    %% Styling
    classDef aws fill:#FF9900,stroke:#232F3E,stroke-width:2px,color:#232F3E
    classDef database fill:#3F48CC,stroke:#232F3E,stroke-width:2px,color:white
    classDef container fill:#0F1419,stroke:#FF9900,stroke-width:2px,color:white
    classDef storage fill:#569A31,stroke:#232F3E,stroke-width:2px,color:white
    classDef security fill:#DD344C,stroke:#232F3E,stroke-width:2px,color:white
    classDef external fill:#4285F4,stroke:#232F3E,stroke-width:2px,color:white

    class ALB,ECR,CloudWatch,ALBLogs,NAT aws
    class RDS database
    class Task1,Task2 container
    class S3 storage
    class ALBSG,ECSSG,RDSSG security
    class Users,Google external
```

This deployment uses enterprise-grade AWS services for scalability, reliability, and security:

- **Container Orchestration**: Amazon ECS with Fargate
- **Database**: Amazon RDS PostgreSQL with pgvector extension
- **File Storage**: Amazon S3
- **Load Balancing**: Application Load Balancer (ALB)
- **Authentication**: Google OAuth + Email/Password
- **Networking**: VPC with security groups

## Infrastructure Components

### Core Services

- **Amazon ECS Cluster**: Container orchestration with Fargate
- **Amazon RDS**: PostgreSQL 16 with pgvector for vector operations
- **Amazon S3**: Object storage for documents and files
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

### Important Notes

- **Password Encoding**: Special characters in database passwords must be URL-encoded
  - `(` becomes `%28`
  - `)` becomes `%29`
  - `$` becomes `%24`
  - `+` becomes `%2B`
- **Security Groups**: RDS must allow connections from ECS security group on port 5432
- **OAuth Setup**: Google OAuth redirect URIs must match your ALB DNS name

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

### 3. Create AWS Resources

```bash
# Create ECS cluster
aws ecs create-cluster --cluster-name open-webui-cluster

# Create IAM roles for ECS tasks
# (See full commands in deployment guide)

# Create Application Load Balancer and target groups
# (See full commands in deployment guide)

# Deploy ECS service
aws ecs create-service --cluster open-webui-cluster --service-name open-webui-service ...
```

### 4. Configure Database

```bash
# Install pgvector extension on RDS PostgreSQL
psql -h your-rds-endpoint -U username -d database -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

### 5. Set Up Google OAuth

1. Go to Google Cloud Console → APIs & Services → Credentials
2. Create OAuth 2.0 Client ID
3. Add authorized redirect URIs:
   - `http://your-alb-dns-name/oauth/google/callback`
4. Add authorized JavaScript origins:
   - `http://your-alb-dns-name`

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

## Scaling and Performance

### Horizontal Scaling

```bash
# Scale ECS service
aws ecs update-service --cluster open-webui-cluster --service open-webui-service --desired-count 3
```

### Vertical Scaling

- **Database**: Modify RDS instance class (e.g., upgrade to `db.r7g.xlarge`)
- **Containers**: Update task definition CPU/memory allocation

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

## Troubleshooting

### Common Issues

1. **Database Connection Timeouts**

   - Check security group rules between ECS and RDS
   - Verify database endpoint and credentials
   - Ensure password is properly URL-encoded

2. **Health Check Failures**

   - Check application logs in CloudWatch
   - Verify container is binding to port 8080
   - Confirm target group health check path

3. **OAuth Redirect Errors**
   - Verify Google OAuth redirect URIs match ALB DNS name
   - Check GOOGLE_REDIRECT_URI environment variable
   - Ensure WEBUI_URL is set correctly

### Log Access

```bash
# View application logs
aws logs get-log-events --log-group-name /ecs/open-webui --log-stream-name ecs/open-webui/TASK-ID
```

## Cost Optimization

- Use Spot instances for non-critical environments
- Enable S3 lifecycle policies for old files
- Monitor RDS usage and scale down during low usage periods
- Consider reserved instances for predictable workloads

## Security Best Practices

- Enable AWS Config for compliance monitoring
- Use AWS Secrets Manager for sensitive configuration
- Implement least privilege IAM policies
- Enable VPC Flow Logs for network monitoring
- Regular security updates for container images

## Support and Maintenance

- Monitor AWS Service Health Dashboard for service updates
- Keep container base images updated for security patches
- Regular backup testing and disaster recovery procedures
- Performance monitoring and capacity planning

---

![Tais Traditional Pattern](../Picture/tais.png)

**Made in Timor-Leste 🇹🇱**
