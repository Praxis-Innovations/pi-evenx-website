#!/bin/bash

# GCP Setup Script for EvenX Website - Using Existing Cluster
# This script sets up the necessary GCP infrastructure using an existing cluster

set -e

# Configuration
PROJECT_ID="central-lock-468900-g4"
CLUSTER_NAME="evenx-autopilot-cluster"
REGION="us-central1"

echo "🚀 Setting up GCP infrastructure for EvenX Website using existing cluster..."

# Check if cluster exists and is running
echo "🔍 Checking cluster status..."
CLUSTER_STATUS=$(gcloud container clusters describe $CLUSTER_NAME --region=$REGION --project=$PROJECT_ID --format="value(status)")

if [ "$CLUSTER_STATUS" != "RUNNING" ]; then
    echo "❌ Cluster $CLUSTER_NAME is not running. Current status: $CLUSTER_STATUS"
    exit 1
fi

echo "✅ Cluster $CLUSTER_NAME is running"

# Enable required APIs (if not already enabled)
echo "📡 Enabling required GCP APIs..."
gcloud services enable container.googleapis.com
gcloud services enable compute.googleapis.com
gcloud services enable dns.googleapis.com
gcloud services enable cloudresourcemanager.googleapis.com

# Get cluster credentials
echo "🔑 Getting cluster credentials..."
gcloud container clusters get-credentials $CLUSTER_NAME --region=$REGION --project=$PROJECT_ID

# Create static IP for ingress
echo "🌐 Creating static IP for ingress..."
gcloud compute addresses create evenx-website-ip --global --project=$PROJECT_ID 2>/dev/null || echo "Static IP already exists"

# Get the static IP
STATIC_IP=$(gcloud compute addresses describe evenx-website-ip --global --project=$PROJECT_ID --format="value(address)")
echo "✅ Static IP: $STATIC_IP"

# Create service account for GitHub Actions
echo "👤 Creating service account for GitHub Actions..."
gcloud iam service-accounts create github-actions --display-name="GitHub Actions Service Account" --project=$PROJECT_ID 2>/dev/null || echo "Service account already exists"

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
    --iam-account=github-actions@$PROJECT_ID.iam.gserviceaccount.com \
    --project=$PROJECT_ID

echo "✅ GCP infrastructure setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add the following secrets to your GitHub repository:"
echo "   - GCP_PROJECT_ID: $PROJECT_ID"
echo "   - GKE_CLUSTER_NAME: $CLUSTER_NAME"
echo "   - GKE_ZONE: $REGION"
echo "   - GCP_SA_KEY: (content of github-actions-key.json)"
echo ""
echo "2. The domain is already configured as 'evenx.io' in the Kubernetes manifests"
echo "3. The API URL is already configured as 'https://evenx.io' in the ConfigMap"
echo "4. Push your code to trigger the deployment!"
echo ""
echo "⚠️  IMPORTANT: Keep the github-actions-key.json file secure and don't commit it to git!"
echo ""
echo "🌐 Your website will be accessible at: https://evenx.io"
