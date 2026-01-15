# 🚀 Automated Deployment Guide

## Your Project is Ready! ✅

Everything is configured and ready for deployment. Follow these steps:

---

## 📋 STEP 1: Deploy Backend to Render (5 minutes)

### Quick Setup:
1. **Go to:** https://render.com
2. **Click:** "Get Started for Free" → Sign up with GitHub
3. **Click:** "New +" → "Web Service"
4. **Connect:** Your `product-workflow` repository

### Configuration (Copy-Paste Ready):
```
Name: product-workflow-api
Environment: Node
Region: (Choose closest to you)
Branch: main
Root Directory: server
Build Command: npm install
Start Command: node index.js
Plan: Free
```

### Environment Variables:
Add these two:
- `NODE_ENV` = `production`
- `PORT` = `5000`

### After Deployment:
- Wait 2-3 minutes
- **Copy your backend URL** (e.g., `https://product-workflow-api.onrender.com`)
- **SAVE IT!** You need it for Step 2

---

## 📋 STEP 2: Deploy Frontend to Vercel (5 minutes)

### Quick Setup:
1. **Go to:** https://vercel.com
2. **Click:** "Sign Up" → "Continue with GitHub"
3. **Click:** "Add New..." → "Project"
4. **Import:** Your `product-workflow` repository

### Configuration:
```
Framework: Create React App (auto-detected)
Root Directory: client
Build Command: npm run build (auto-filled)
Output Directory: build (auto-filled)
```

### Environment Variable:
Add this ONE variable:
- **Key:** `REACT_APP_API_URL`
- **Value:** (Paste your Render backend URL from Step 1)
  - Example: `https://product-workflow-api.onrender.com`
  - ⚠️ **NO trailing slash!**

### Deploy:
- Click "Deploy"
- Wait 2-3 minutes
- **🎉 Your app is LIVE!**

---

## ✅ Success!

Your app URLs:
- **Frontend:** `https://your-app.vercel.app` (always on!)
- **Backend:** `https://your-api.onrender.com` (free tier)

---

## 🔄 Updates

After making changes:
1. Push to GitHub
2. Render & Vercel auto-deploy (2-3 minutes)
3. Done!

---

## 🆘 Troubleshooting

### Backend Issues:
- ✅ Root Directory must be: `server`
- ✅ Check Render logs if it won't start
- ✅ First request takes ~30 seconds (cold start - normal!)

### Frontend Issues:
- ✅ Root Directory must be: `client`
- ✅ `REACT_APP_API_URL` must have NO trailing slash
- ✅ Wait for backend to wake up (~30 seconds first time)

---

**Ready? Start with Render!** 🚀
