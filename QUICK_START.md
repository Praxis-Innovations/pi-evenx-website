# 🚀 Quick Start - Deploy EvenX Website to GCP

## ⚡ 5-Minute Setup

### 1. Prerequisites Check
```bash
# Install Google Cloud SDK (if not installed)
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Install kubectl (if not installed)
gcloud components install kubectl

# Login to GCP
gcloud auth login
```

### 2. One-Command Setup
```bash
# Update PROJECT_ID in scripts/setup-gcp.sh first
# Then run:
./scripts/setup-gcp.sh
```

### 3. Add GitHub Secrets
Copy the values from the setup script output to your GitHub repository secrets.

### 4. Update Configuration
Replace these placeholders in the files:
- `your-project-id` → Your actual GCP project ID
- `your-domain.com` → Your actual domain (if you have one)

### 5. Deploy
```bash
# Manual deployment
./scripts/deploy.sh

# OR push to main branch for automatic deployment
git add .
git commit -m "Initial deployment setup"
git push origin main
```

## 🎯 What You Get

✅ **Production-ready React app** with Nginx  
✅ **Auto-scaling Kubernetes cluster**  
✅ **SSL certificates** (automatic)  
✅ **Load balancing** and health checks  
✅ **GitHub Actions CI/CD** pipeline  
✅ **Monitoring** and logging  

## 🔗 Next Steps

- Read [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions
- Customize your domain and configuration
- Set up monitoring and alerts
- Configure backup and disaster recovery

---

**Your website will be live in minutes! 🌐**
