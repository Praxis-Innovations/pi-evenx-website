#!/bin/bash

# Manual Docker Build and Push Script
# This script builds and pushes the Docker image to Google Container Registry

set -e

# Configuration
PROJECT_ID="central-lock-468900-g4"
IMAGE_NAME="evenx-website"
TAG=${1:-"latest"}

echo "🐳 Building and pushing Docker image to GCR..."

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if gcloud is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "❌ Not authenticated with gcloud. Please run 'gcloud auth login' first."
    exit 1
fi

# Configure Docker for GCR
echo "🔐 Configuring Docker for GCR..."
gcloud auth configure-docker

# Build the Docker image
echo "🏗️  Building Docker image..."
docker build -t gcr.io/$PROJECT_ID/$IMAGE_NAME:$TAG .

# Tag as latest if not already
if [ "$TAG" != "latest" ]; then
    docker tag gcr.io/$PROJECT_ID/$IMAGE_NAME:$TAG gcr.io/$PROJECT_ID/$IMAGE_NAME:latest
fi

# Push the image
echo "📤 Pushing image to GCR..."
docker push gcr.io/$PROJECT_ID/$IMAGE_NAME:$TAG

if [ "$TAG" != "latest" ]; then
    docker push gcr.io/$PROJECT_ID/$IMAGE_NAME:latest
fi

echo "✅ Image successfully pushed to GCR!"
echo "📋 Image: gcr.io/$PROJECT_ID/$IMAGE_NAME:$TAG"
echo ""
echo "🚀 You can now deploy using: ./scripts/deploy-simple.sh"
echo "   Or update the deployment with: kubectl set image deployment/evenx-website evenx-website=gcr.io/$PROJECT_ID/$IMAGE_NAME:$TAG -n evenx-website"
