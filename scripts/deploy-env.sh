#!/bin/bash

# Deploy to specific environment
# This script deploys the EvenX website to different environments

set -e

ENVIRONMENT=${1:-"dev"}
NAMESPACE="evenx-$ENVIRONMENT"

echo "🚀 Deploying EvenX Website to $ENVIRONMENT environment..."

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
gcloud container clusters get-credentials evenx-autopilot-cluster --region=us-central1 --project=central-lock-468900-g4

# Create namespace if it doesn't exist
echo "📁 Creating namespace..."
kubectl apply -f k8s/namespace-$ENVIRONMENT.yaml

# Apply deployment
echo "🚀 Applying deployment..."
kubectl apply -f k8s/deployment-$ENVIRONMENT.yaml

# Apply service
echo "🔌 Applying service..."
kubectl apply -f k8s/service-$ENVIRONMENT.yaml

# Wait for deployment to be ready
echo "⏳ Waiting for deployment to be ready..."
kubectl rollout status deployment/evenx-website -n $NAMESPACE --timeout=300s

# Show deployment status
echo "📊 Deployment status:"
kubectl get pods -n $NAMESPACE
kubectl get service -n $NAMESPACE

echo "✅ Deployment to $ENVIRONMENT environment complete!"
echo ""
echo "🌐 Your website is now accessible in the $NAMESPACE namespace"
echo "📋 To check the status, run: kubectl get all -n $NAMESPACE"
