#!/bin/bash

# Local Deployment Script for EvenX Website
# This script provides alternative deployment methods when GCR push fails

set -e

# Configuration
PROJECT_ID="central-lock-468900-g4"
CLUSTER_NAME="evenx-autopilot-cluster"
REGION="us-central1"

echo "🚀 Deploying EvenX Website using alternative methods..."

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed. Please install it first."
    exit 1
fi

# Check if gcloud is installed and authenticated
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud is not installed. Please install it first."
    exit 1
fi

# Get cluster credentials
echo "🔑 Getting cluster credentials..."
gcloud container clusters get-credentials $CLUSTER_NAME --region=$REGION --project=$PROJECT_ID

# Create namespace if it doesn't exist
echo "📁 Creating namespace..."
kubectl apply -f k8s/namespace.yaml

# Apply ConfigMap
echo "⚙️  Applying ConfigMap..."
kubectl apply -f k8s/configmap.yaml

# Check if we have a local image
if docker images | grep -q "evenx-website"; then
    echo "✅ Local Docker image found"
    
    # Create a deployment that uses a local image or provides instructions
    echo "📋 Since GCR push failed, you have these options:"
    echo ""
    echo "Option 1: Use a public image temporarily"
    echo "   kubectl set image deployment/evenx-website evenx-website=nginx:alpine -n evenx-website"
    echo ""
    echo "Option 2: Load image to cluster nodes (if you have access)"
    echo "   docker save evenx-website:latest | gcloud compute ssh <node-name> --zone=<zone> --command='docker load'"
    echo ""
    echo "Option 3: Use a different registry (Docker Hub, etc.)"
    echo ""
    echo "Option 4: Ask your project admin to grant storage permissions"
    echo ""
    
    # Create a basic deployment with nginx for now
    echo "🚀 Creating basic deployment with nginx..."
    kubectl apply -f k8s/deployment.yaml
    
    # Update the image to use nginx temporarily
    kubectl set image deployment/evenx-website evenx-website=nginx:alpine -n evenx-website
    
else
    echo "❌ No local Docker image found. Please build the image first."
    echo "   Run: docker build -t evenx-website ."
    exit 1
fi

# Apply service
echo "🔌 Applying service..."
kubectl apply -f k8s/service.yaml

# Apply HPA
echo "📈 Applying Horizontal Pod Autoscaler..."
kubectl apply -f k8s/hpa.yaml

# Apply frontend config
echo "🌐 Applying frontend configuration..."
kubectl apply -f k8s/frontend-config.yaml

# Apply managed certificate
echo "🔒 Applying managed certificate..."
kubectl apply -f k8s/managed-cert.yaml

# Apply ingress
echo "🌍 Applying ingress..."
kubectl apply -f k8s/ingress.yaml

# Wait for deployment to be ready
echo "⏳ Waiting for deployment to be ready..."
kubectl rollout status deployment/evenx-website -n evenx-website --timeout=300s

# Show deployment status
echo "📊 Deployment status:"
kubectl get pods -n evenx-website
kubectl get service -n evenx-website
kubectl get ingress -n evenx-website

echo "✅ Basic deployment complete!"
echo ""
echo "🌐 Your website is now accessible at the ingress IP address"
echo "📋 To check the status, run: kubectl get all -n evenx-website"
echo ""
echo "⚠️  Note: This deployment uses nginx:alpine as a placeholder."
echo "   To use your actual application, you'll need to:"
echo "   1. Push the image to a registry you have access to, or"
echo "   2. Ask your project admin to grant storage permissions, or"
echo "   3. Use a different deployment strategy"
echo ""
echo "🔧 To update to your actual image later:"
echo "   kubectl set image deployment/evenx-website evenx-website=<your-image> -n evenx-website"
