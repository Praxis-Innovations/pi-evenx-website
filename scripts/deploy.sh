#!/bin/bash

# Manual Deployment Script for EvenX Website
# This script can be used for manual deployments or troubleshooting

set -e

# Configuration
PROJECT_ID=${GCP_PROJECT_ID:-"central-lock-468900-g4"}
CLUSTER_NAME=${GKE_CLUSTER_NAME:-"evenx-autopilot-cluster"}
ZONE=${GKE_ZONE:-"us-central1"}
IMAGE_TAG=${IMAGE_TAG:-"latest"}

echo "🚀 Deploying EvenX Website to GCP Kubernetes..."

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
gcloud container clusters get-credentials $CLUSTER_NAME --region=$ZONE --project=$PROJECT_ID

# Create namespace if it doesn't exist
echo "📁 Creating namespace..."
kubectl apply -f k8s/namespace.yaml

# Apply ConfigMap
echo "⚙️  Applying ConfigMap..."
kubectl apply -f k8s/configmap.yaml

# Apply deployment
echo "🚀 Applying deployment..."
kubectl apply -f k8s/deployment.yaml

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

echo "✅ Deployment complete!"
echo ""
echo "🌐 Your website should be accessible at the ingress IP address"
echo "📋 To check the status, run: kubectl get all -n evenx-website"
