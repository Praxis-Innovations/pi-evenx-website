#!/bin/bash

# Build and Push Script with Environment Support
# This script builds Docker images for different environments with build-time variables
# Uses Yarn for package management (preserving existing setup)

set -e

# Configuration
PROJECT_ID="central-lock-468900-g4"
IMAGE_NAME="evenx-website"
DOCKER_USERNAME="praxisinnovations"
ENVIRONMENT=${1:-"dev"}

echo "🐳 Building and pushing Docker image for $ENVIRONMENT environment..."

# Set environment-specific variables
case $ENVIRONMENT in
    "local")
        API_URL="http://localhost:8080"
        TAG="local"
        echo "🏠 Building for LOCAL environment"
        ;;
    "dev"|"development")
        API_URL="http://35.244.150.211"
        TAG="dev"
        echo "🔧 Building for DEVELOPMENT environment"
        ;;
    "prod"|"production")
        API_URL="https://api.evenx.io"
        TAG="prod"
        echo "🚀 Building for PRODUCTION environment"
        ;;
    *)
        echo "❌ Unknown environment: $ENVIRONMENT"
        echo "Usage: $0 [local|dev|prod]"
        echo ""
        echo "Examples:"
        echo "  $0 local     # Build for local development"
        echo "  $0 dev       # Build for development environment"
        echo "  $0 prod      # Build for production environment"
        exit 1
        ;;
esac

echo "🌐 API URL: $API_URL"
echo "🏷️  Tag: $TAG"

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Build the Docker image with environment variables
echo "🏗️  Building Docker image..."
docker build \
    --build-arg REACT_APP_API_URL=$API_URL \
    -t $DOCKER_USERNAME/$IMAGE_NAME:$TAG \
    -t $DOCKER_USERNAME/$IMAGE_NAME:latest \
    .

# Tag for local use as well
docker tag $DOCKER_USERNAME/$IMAGE_NAME:$TAG $IMAGE_NAME:$TAG

echo "✅ Docker image built successfully!"
echo "📋 Local image: $IMAGE_NAME:$TAG"
echo "📋 Docker Hub image: $DOCKER_USERNAME/$IMAGE_NAME:$TAG"

# Ask user if they want to push to Docker Hub
read -p "🤔 Do you want to push this image to Docker Hub? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Pushing image to Docker Hub..."
    
    # Check if logged in to Docker Hub
    if ! docker info | grep -q "Username"; then
        echo "🔐 Please login to Docker Hub first:"
        echo "   docker login"
        exit 1
    fi
    
    # Push to Docker Hub
    docker push $DOCKER_USERNAME/$IMAGE_NAME:$TAG
    docker push $DOCKER_USERNAME/$IMAGE_NAME:latest
    
    echo "✅ Image successfully pushed to Docker Hub!"
    echo "📋 Image: $DOCKER_USERNAME/$IMAGE_NAME:$TAG"
    echo "🌐 API URL: $API_URL"
    echo ""
    echo "🚀 You can now deploy using:"
    echo "   kubectl apply -f k8s/deployment-$ENVIRONMENT.yaml"
else
    echo "📋 Image built locally. You can push later with:"
    echo "   docker push $DOCKER_USERNAME/$IMAGE_NAME:$TAG"
fi
