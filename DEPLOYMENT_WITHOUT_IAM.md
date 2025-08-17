# 🚀 EvenX Website Deployment - Without IAM Permissions

Since you don't have permission to modify IAM policies, here's how to deploy your website using your existing `evenx-autopilot-cluster`.

## 🏗️ **Current Setup**

✅ **GKE Cluster**: `evenx-autopilot-cluster` (us-central1)  
✅ **Project ID**: `central-lock-468900-g4`  
✅ **Domain**: `evenx.io`  
✅ **Static IP**: `34.8.239.143`  

## 📋 **What You Can Do Without IAM Permissions**

- ✅ Deploy Kubernetes resources
- ✅ Build and push Docker images to GCR
- ✅ Manage deployments and services
- ✅ Access cluster logs and monitoring

## ❌ **What Requires Admin Permissions**

- Creating new service accounts
- Modifying IAM policies
- Setting up automated GitHub Actions deployment

## 🚀 **Deployment Steps**

### 1. **Build and Push Docker Image**

```bash
# Make sure Docker is running
./scripts/build-and-push.sh

# Or with a specific tag
./scripts/build-and-push.sh v1.0.0
```

### 2. **Deploy to Kubernetes**

```bash
# Deploy all resources
./scripts/deploy-simple.sh
```

### 3. **Verify Deployment**

```bash
# Check all resources
kubectl get all -n evenx-website

# Check ingress status
kubectl get ingress -n evenx-website

# Check pod logs
kubectl logs -f deployment/evenx-website -n evenx-website
```

## 🔄 **Updating the Application**

### **Option 1: Full Redeployment**
```bash
# Build and push new image
./scripts/build-and-push.sh v1.1.0

# Redeploy everything
./scripts/deploy-simple.sh
```

### **Option 2: Update Image Only**
```bash
# Build and push new image
./scripts/build-and-push.sh v1.1.0

# Update deployment with new image
kubectl set image deployment/evenx-website evenx-website=gcr.io/central-lock-468900-g4/evenx-website:v1.1.0 -n evenx-website

# Wait for rollout
kubectl rollout status deployment/evenx-website -n evenx-website
```

## 🌐 **Accessing Your Website**

Once deployed, your website will be accessible at:
- **IP Address**: `34.8.239.143`
- **Domain**: `https://evenx.io` (after DNS is configured)

## 📊 **Monitoring and Troubleshooting**

### **Check Deployment Status**
```bash
# Get all resources
kubectl get all -n evenx-website

# Check pod status
kubectl get pods -n evenx-website

# Check service status
kubectl get service -n evenx-website

# Check ingress status
kubectl get ingress -n evenx-website
```

### **View Logs**
```bash
# Application logs
kubectl logs -f deployment/evenx-website -n evenx-website

# Ingress controller logs
kubectl logs -f -l app=nginx-ingress -n ingress-nginx
```

### **Common Issues**

#### **1. Image Pull Errors**
```bash
# Check if image exists in GCR
gcloud container images list-tags gcr.io/central-lock-468900-g4/evenx-website

# Verify image was pushed correctly
docker pull gcr.io/central-lock-468900-g4/evenx-website:latest
```

#### **2. Ingress Not Working**
```bash
# Check ingress configuration
kubectl describe ingress evenx-website-ingress -n evenx-website

# Check if static IP is assigned
gcloud compute addresses describe evenx-website-ip --global
```

#### **3. SSL Certificate Issues**
```bash
# Check managed certificate status
kubectl describe managedcertificate evenx-website-cert -n evenx-website

# Verify domain DNS configuration
nslookup evenx.io
```

## 🔧 **Manual Operations**

### **Scale Deployment**
```bash
# Scale to 5 replicas
kubectl scale deployment evenx-website --replicas=5 -n evenx-website

# Check scaling
kubectl get hpa -n evenx-website
```

### **Restart Deployment**
```bash
# Restart all pods
kubectl rollout restart deployment/evenx-website -n evenx-website

# Check rollout status
kubectl rollout status deployment/evenx-website -n evenx-website
```

### **Delete and Recreate**
```bash
# Delete all resources
kubectl delete namespace evenx-website

# Recreate everything
./scripts/deploy-simple.sh
```

## 🚀 **Getting Automated Deployment**

To enable automated deployments via GitHub Actions, you'll need to ask your project admin to:

1. **Grant IAM permissions** to your account:
   - `roles/iam.serviceAccountAdmin`
   - `roles/resourcemanager.projectIamAdmin`

2. **Or create a service account** with the necessary permissions:
   - `roles/container.developer`
   - `roles/storage.admin`
   - `roles/iam.serviceAccountUser`

## 📚 **Useful Commands**

```bash
# Get cluster info
gcloud container clusters describe evenx-autopilot-cluster --region=us-central1

# Get cluster credentials
gcloud container clusters get-credentials evenx-autopilot-cluster --region=us-central1

# List all namespaces
kubectl get namespaces

# Get events in namespace
kubectl get events -n evenx-website

# Port forward for local testing
kubectl port-forward service/evenx-website-service 8080:80 -n evenx-website
```

## 🎯 **Next Steps**

1. **Deploy your first version** using the scripts above
2. **Test the deployment** and verify everything works
3. **Configure DNS** to point `evenx.io` to the static IP
4. **Request IAM permissions** from your project admin for automation
5. **Set up monitoring** and alerting

---

**Your website will be live and accessible! 🌐**
