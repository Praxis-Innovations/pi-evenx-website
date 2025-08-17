# EvenX Website - GCP Kubernetes Deployment Guide

This guide will walk you through deploying the EvenX website to Google Cloud Platform (GCP) using Kubernetes and GitHub Actions.

## 🏗️ Architecture Overview

- **Frontend**: React SPA served by Nginx
- **Container Registry**: Google Container Registry (GCR)
- **Orchestration**: Google Kubernetes Engine (GKE)
- **CI/CD**: GitHub Actions
- **Load Balancing**: GKE Ingress with SSL termination
- **Auto-scaling**: Horizontal Pod Autoscaler (HPA)

## 📋 Prerequisites

1. **GCP Account** with billing enabled
2. **Google Cloud SDK** installed and configured
3. **kubectl** installed
4. **GitHub repository** with your code
5. **Domain name** (optional, for custom domain)

## 🚀 Step-by-Step Deployment

### 1. GCP Project Setup

```bash
# Set your project ID
export PROJECT_ID="your-project-id"

# Create a new project (if needed)
gcloud projects create $PROJECT_ID

# Set the project as default
gcloud config set project $PROJECT_ID

# Enable billing (you'll need to do this manually in the GCP console)
```

### 2. Run the Setup Script

```bash
# Make the script executable
chmod +x scripts/setup-gcp.sh

# Update the PROJECT_ID in the script first
# Then run the setup
./scripts/setup-gcp.sh
```

This script will:
- Enable required GCP APIs
- Create a GKE cluster
- Create a static IP for ingress
- Create a service account for GitHub Actions
- Generate the service account key

### 3. Configure GitHub Secrets

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- `GCP_PROJECT_ID`: Your GCP project ID
- `GKE_CLUSTER_NAME`: The cluster name (default: evenx-cluster)
- `GKE_ZONE`: The zone where your cluster is located
- `GCP_SA_KEY`: The entire content of the `github-actions-key.json` file

### 4. Update Configuration Files

Before deploying, update these files with your specific values:

#### k8s/deployment.yaml
```yaml
# Replace PROJECT_ID with your actual project ID
image: gcr.io/PROJECT_ID/evenx-website:latest
```

#### k8s/ingress.yaml
```yaml
# Replace with your actual domain
host: your-domain.com
```

#### k8s/managed-cert.yaml
```yaml
# Replace with your actual domain
domains:
  - your-domain.com
```

#### k8s/configmap.yaml
```yaml
# Replace with your actual API URL
REACT_APP_API_URL: "https://api.your-domain.com"
```

### 5. Deploy to Kubernetes

#### Option A: Automatic Deployment via GitHub Actions
Simply push your code to the main/master branch. The GitHub Actions workflow will:
1. Run tests
2. Build the Docker image
3. Push to GCR
4. Deploy to Kubernetes

#### Option B: Manual Deployment
```bash
# Make the script executable
chmod +x scripts/deploy.sh

# Set environment variables
export GCP_PROJECT_ID="your-project-id"
export GKE_CLUSTER_NAME="evenx-cluster"
export GKE_ZONE="us-central1-a"

# Run the deployment
./scripts/deploy.sh
```

## 🔍 Monitoring and Troubleshooting

### Check Deployment Status
```bash
# Get all resources in the namespace
kubectl get all -n evenx-website

# Check pod logs
kubectl logs -f deployment/evenx-website -n evenx-website

# Check ingress status
kubectl describe ingress evenx-website-ingress -n evenx-website
```

### Common Issues and Solutions

#### 1. Image Pull Errors
```bash
# Check if the image exists in GCR
gcloud container images list-tags gcr.io/$PROJECT_ID/evenx-website

# Verify service account permissions
gcloud projects get-iam-policy $PROJECT_ID
```

#### 2. Ingress Not Working
```bash
# Check if the static IP is assigned
gcloud compute addresses list

# Verify ingress configuration
kubectl describe ingress evenx-website-ingress -n evenx-website
```

#### 3. SSL Certificate Issues
```bash
# Check managed certificate status
kubectl describe managedcertificate evenx-website-cert -n evenx-website

# Verify domain DNS configuration
nslookup your-domain.com
```

## 📊 Scaling and Performance

The deployment includes:
- **Horizontal Pod Autoscaler**: Automatically scales pods based on CPU and memory usage
- **Resource Limits**: Prevents resource exhaustion
- **Health Checks**: Ensures only healthy pods receive traffic
- **Load Balancing**: Distributes traffic across multiple pods

## 🔒 Security Features

- **Network Policies**: Restricts pod-to-pod communication
- **Service Account**: Minimal required permissions for GitHub Actions
- **HTTPS**: Automatic SSL certificate management
- **Security Headers**: Added by Nginx configuration

## 💰 Cost Optimization

- **Node Autoscaling**: Automatically scales nodes based on demand
- **Resource Requests**: Prevents over-provisioning
- **Spot Instances**: Can be enabled for cost savings (not included in current setup)

## 🧹 Cleanup

To remove all resources:
```bash
# Delete the cluster
gcloud container clusters delete evenx-cluster --zone=us-central1-a

# Delete the static IP
gcloud compute addresses delete evenx-website-ip --global

# Delete the service account
gcloud iam service-accounts delete github-actions@$PROJECT_ID.iam.gserviceaccount.com

# Delete the project (optional)
gcloud projects delete $PROJECT_ID
```

## 📚 Additional Resources

- [GKE Documentation](https://cloud.google.com/kubernetes-engine/docs)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GCP Pricing Calculator](https://cloud.google.com/products/calculator)

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the GitHub Actions logs
3. Check GCP Cloud Logging
4. Verify all configuration files are properly updated
5. Ensure all prerequisites are met

---

**Happy Deploying! 🚀**
