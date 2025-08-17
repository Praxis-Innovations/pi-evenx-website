#!/bin/bash

# GCP Setup Script for EvenX Website
# This script sets up the necessary GCP infrastructure

set -e

# Configuration
PROJECT_ID="central-lock-468900-g4"  
CLUSTER_NAME="evenx-autopilot-cluster"
ZONE="us-central1"  # Autopilot clusters use region, not zone
REGION="us-central1"  # Replace with your preferred region

echo "🚀 Setting up GCP infrastructure for EvenX Website..."

# Enable required APIs
echo "📡 Enabling required GCP APIs..."
gcloud services enable container.googleapis.com
gcloud services enable compute.googleapis.com
gcloud services enable dns.googleapis.com
gcloud services enable cloudresourcemanager.googleapis.com

# Create GKE cluster
echo "🏗️  Creating GKE cluster..."
gcloud container clusters create $CLUSTER_NAME \
    --region=$REGION \
    --enable-autopilot \
    --enable-autoscaling \
    --enable-autoupgrade \
    --enable-autorepair \
    --enable-network-policy \
    --enable-ip-alias

# Get cluster credentials
echo "🔑 Getting cluster credentials..."
gcloud container clusters get-credentials $CLUSTER_NAME --region=$REGION

# Create static IP for ingress
echo "🌐 Creating static IP for ingress..."
gcloud compute addresses create evenx-website-ip --global

# Get the static IP
STATIC_IP=$(gcloud compute addresses describe evenx-website-ip --global --format="value(address)")
echo "✅ Static IP created: $STATIC_IP"

# Create service account for GitHub Actions
echo "👤 Creating service account for GitHub Actions..."
gcloud iam service-accounts create github-actions \
    --display-name="GitHub Actions Service Account"

# Grant necessary permissions
echo "🔐 Granting permissions to service account..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/container.developer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"

# Create and download service account key
echo "🔑 Creating service account key..."
gcloud iam service-accounts keys create github-actions-key.json \
    --iam-account=github-actions@$PROJECT_ID.iam.gserviceaccount.com

echo "✅ GCP infrastructure setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add the following secrets to your GitHub repository:"
echo "   - GCP_PROJECT_ID: $PROJECT_ID"
echo "   - GKE_CLUSTER_NAME: $CLUSTER_NAME"
echo "   - GKE_ZONE: $REGION"
echo "   - GCP_SA_KEY: (content of github-actions-key.json)"
echo ""
echo "2. Update the domain in k8s/ingress.yaml and k8s/managed-cert.yaml"
echo "3. Update the API URL in k8s/configmap.yaml"
echo "4. Update PROJECT_ID in k8s/deployment.yaml"
echo "5. Push your code to trigger the deployment!"
echo ""
echo "⚠️  IMPORTANT: Keep the github-actions-key.json file secure and don't commit it to git!"
