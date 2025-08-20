# 🚀 EvenX Website Deployment Guide

This guide explains how to deploy your EvenX website using **Approach 1: Build-time Environment Variables** with Docker and Kubernetes.

## 🏗️ **Architecture Overview**

- **Build-time Environment Variables**: Environment-specific API URLs are baked into Docker images during build
- **Docker Images**: Different images for different environments (local, dev, prod)
- **Kubernetes Deployment**: Environment-specific deployments with proper namespacing
- **Yarn Package Manager**: Preserved from your existing setup

## 🌍 **Environment Configuration**

### **Local Development**
- **API URL**: `http://localhost:8080`
- **Use Case**: Running `yarn start` for local development
- **Docker Tag**: `local`

### **Development Environment**
- **API URL**: `http://35.244.150.211`
- **Use Case**: Development/staging deployments
- **Docker Tag**: `dev`
- **Namespace**: `evenx-dev`

### **Production Environment**
- **API URL**: `https://api.evenx.io`
- **Use Case**: Production deployments
- **Docker Tag**: `prod`
- **Namespace**: `evenx-prod`

## 🐳 **Docker Build Process**

### **How Build-time Environment Variables Work**

1. **Dockerfile**: Uses `ARG REACT_APP_API_URL` to accept build-time variables
2. **Build Command**: `docker build --build-arg REACT_APP_API_URL=<url>`
3. **Environment Variable**: Set during build process and baked into the image
4. **Runtime**: No need to pass environment variables at runtime

### **Build Commands**

```bash
# Build for local development
yarn docker:build:local

# Build for development environment
yarn docker:build:dev

# Build for production environment
yarn docker:build:prod
```

### **Manual Docker Build Commands**

```bash
# Local development
docker build --build-arg REACT_APP_API_URL=http://localhost:8080 -t evenx-website:local .

# Development environment
docker build --build-arg REACT_APP_API_URL=http://35.244.150.211 -t evenx-website:dev .

# Production environment
docker build --build-arg REACT_APP_API_URL=https://api.evenx.io -t evenx-website:prod .
```

## 🚀 **Deployment Workflow**

### **Step 1: Build Docker Image**
```bash
# Choose your environment
yarn docker:build:dev    # For development
yarn docker:build:prod   # For production
```

### **Step 2: Push to Docker Hub**
The build script will ask if you want to push to Docker Hub. If yes:
```bash
# Login to Docker Hub first (if not already logged in)
docker login

# Then run the build script
yarn docker:build:dev
```

### **Step 3: Deploy to Kubernetes**
```bash
# Deploy to development environment
yarn deploy:dev

# Deploy to production environment
yarn deploy:prod
```

## 📋 **Available NPM Scripts**

### **Build Scripts**
```bash
# Local builds (without Docker)
yarn build:local     # Builds with localhost:8080
yarn build:dev       # Builds with 35.244.150.211
yarn build:prod      # Builds with api.evenx.io

# Docker builds
yarn docker:build:local  # Builds Docker image for local
yarn docker:build:dev    # Builds Docker image for dev
yarn docker:build:prod   # Builds Docker image for prod
```

### **Deployment Scripts**
```bash
# Kubernetes deployments
yarn deploy:dev      # Deploys to development namespace
yarn deploy:prod     # Deploys to production namespace
```

## 🔧 **Manual Deployment Commands**

### **Using Scripts Directly**
```bash
# Build and push
./scripts/build-and-push.sh dev
./scripts/build-and-push.sh prod

# Deploy
./scripts/deploy-env.sh dev
./scripts/deploy-env.sh prod
```

### **Using kubectl Directly**
```bash
# Create namespace
kubectl apply -f k8s/namespace-dev.yaml
kubectl apply -f k8s/namespace-prod.yaml

# Deploy application
kubectl apply -f k8s/deployment-dev.yaml
kubectl apply -f k8s/deployment-prod.yaml

# Apply services
kubectl apply -f k8s/service-dev.yaml
kubectl apply -f k8s/service-prod.yaml
```

## 🌐 **Accessing Your Application**

### **Development Environment**
```bash
# Check deployment status
kubectl get all -n evenx-dev

# Check pods
kubectl get pods -n evenx-dev

# Check services
kubectl get services -n evenx-dev
```

### **Production Environment**
```bash
# Check deployment status
kubectl get all -n evenx-prod

# Check pods
kubectl get pods -n evenx-prod

# Check services
kubectl get services -n evenx-prod
```

## 🔍 **Troubleshooting**

### **Build Issues**
```bash
# Check Docker is running
docker info

# Check Docker Hub login
docker login

# Verify image was built
docker images | grep evenx-website
```

### **Deployment Issues**
```bash
# Check cluster access
gcloud container clusters get-credentials evenx-autopilot-cluster --region=us-central1

# Check namespace exists
kubectl get namespaces | grep evenx

# Check deployment status
kubectl describe deployment evenx-website -n evenx-dev
```

### **Runtime Issues**
```bash
# Check pod logs
kubectl logs -f deployment/evenx-website -n evenx-dev

# Check pod events
kubectl get events -n evenx-dev

# Check pod status
kubectl describe pod <pod-name> -n evenx-dev
```

## 📊 **Environment Comparison**

| Aspect | Local | Development | Production |
|--------|-------|-------------|------------|
| API URL | localhost:8080 | 35.244.150.211 | api.evenx.io |
| Docker Tag | local | dev | prod |
| Namespace | N/A | evenx-dev | evenx-prod |
| Replicas | N/A | 1 | 3 |
| Debug | true | true | false |
| Build Command | yarn build:local | yarn docker:build:dev | yarn docker:build:prod |

## 🎯 **Best Practices**

1. **Always build for the target environment** before deployment
2. **Use the npm scripts** for consistent builds and deployments
3. **Verify the image tag** matches your deployment configuration
4. **Check deployment status** after applying Kubernetes manifests
5. **Monitor pod logs** for any runtime issues

## 🚨 **Important Notes**

- **Environment variables are baked into the image** at build time
- **No runtime environment variable injection** needed
- **Each environment gets its own Docker image** with the correct API URL
- **Kubernetes deployments reference specific image tags** for each environment
- **Yarn is preserved** throughout the build and deployment process

## 🔗 **Related Files**

- `Dockerfile` - Docker build configuration with build-time variables
- `scripts/build-and-push.sh` - Docker build and push script
- `scripts/deploy-env.sh` - Kubernetes deployment script
- `k8s/deployment-*.yaml` - Environment-specific deployments
- `k8s/namespace-*.yaml` - Environment-specific namespaces
- `k8s/service-*.yaml` - Environment-specific services
- `package.json` - NPM scripts for builds and deployments

---

**Your deployment system is now ready! Start with `yarn docker:build:dev` to build your first environment-specific image.** 🚀
