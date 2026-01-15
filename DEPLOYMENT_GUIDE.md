# 🚀 Free Cloud Deployment Guide - Render.com

This guide will help you deploy your Product Development Workflow application to Render.com **completely FREE**!

## Why Render?

✅ **100% Free Tier** - Perfect for small to medium teams  
✅ **Easy Setup** - Deploy in 10 minutes  
✅ **Automatic HTTPS** - Secure URLs  
✅ **Persistent Storage** - Your data stays safe  
✅ **Auto-Deploy** - Updates automatically from GitHub  

---

## Prerequisites

1. **GitHub Account** (free) - [Sign up here](https://github.com)
2. **Render Account** (free) - [Sign up here](https://render.com)
3. **Your code** - Already done! ✅

---

## Step-by-Step Deployment

### Step 1: Push Code to GitHub

1. **Create a new GitHub repository:**
   - Go to [github.com/new](https://github.com/new)
   - Name it: `product-workflow-app`
   - Make it **Public** (required for free Render)
   - Click "Create repository"

2. **Push your code to GitHub:**
   ```bash
   # In your project directory
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/product-workflow-app.git
   git push -u origin main
   ```

   **Note:** Replace `YOUR_USERNAME` with your GitHub username

---

### Step 2: Deploy Backend to Render

1. **Go to Render Dashboard:**
   - Visit [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Web Service"

2. **Connect GitHub:**
   - Click "Connect GitHub"
   - Authorize Render to access your repositories
   - Select your `product-workflow-app` repository

3. **Configure Backend Service:**
   - **Name:** `product-workflow-api`
   - **Environment:** `Node`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `server` (IMPORTANT!)
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Plan:** `Free`

4. **Add Environment Variables:**
   - Click "Advanced"
   - Add:
     ```
     NODE_ENV=production
     PORT=5000
     ```

5. **Add Persistent Disk (for database & uploads):**
   - Scroll to "Disks"
   - Click "Add Disk"
   - **Name:** `product-data`
   - **Mount Path:** `/opt/render/project/src/server`
   - **Size:** 1 GB (free tier)
   - **Click "Create Web Service"**

6. **Wait for deployment** (2-3 minutes)
   - Copy the URL (e.g., `https://product-workflow-api.onrender.com`)
   - **This is your backend API URL** - Save it!

---

### Step 3: Deploy Frontend to Render

1. **Create New Static Site:**
   - In Render Dashboard, click "New +" → "Static Site"

2. **Configure Frontend:**
   - **Name:** `product-workflow-frontend`
   - **Repository:** Select your `product-workflow-app`
   - **Branch:** `main`
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`

3. **Add Environment Variable:**
   - **Key:** `REACT_APP_API_URL`
   - **Value:** Your backend URL from Step 2 (e.g., `https://product-workflow-api.onrender.com`)
   - **Click "Create Static Site"**

4. **Wait for deployment** (3-5 minutes)
   - Your app will be live at: `https://product-workflow-frontend.onrender.com`

---

## 🎉 You're Done!

Your application is now live and accessible from anywhere:
- **Frontend:** `https://product-workflow-frontend.onrender.com`
- **Backend:** `https://product-workflow-api.onrender.com`

Share the frontend URL with your colleagues - they can access it from anywhere!

---

## 📝 Important Notes

### Free Tier Limitations:
- **Spins down after 15 minutes of inactivity** (wakes up on next request)
- **First request after spin-down takes ~30 seconds** (cold start)
- **512 MB RAM** - Enough for small to medium teams
- **100 GB bandwidth/month** - Plenty for most use cases

### Data Persistence:
- ✅ Database (`database.json`) is stored on persistent disk
- ✅ Uploaded files are stored on persistent disk
- ✅ Data survives deployments and restarts

### Updating Your App:
1. Make changes locally
2. Push to GitHub: `git push`
3. Render automatically deploys (takes 2-3 minutes)

---

## 🔧 Troubleshooting

### Backend won't start:
- Check logs in Render Dashboard
- Verify `Root Directory` is set to `server`
- Check environment variables are set correctly

### Frontend can't connect to backend:
- Verify `REACT_APP_API_URL` is set correctly
- Make sure backend URL doesn't have trailing slash
- Check CORS is enabled (already done in code)

### Files not uploading:
- Verify persistent disk is mounted correctly
- Check disk has enough space
- Review server logs for errors

### Slow first load:
- Normal for free tier (cold start)
- Consider upgrading to paid plan for always-on

---

## 🆙 Upgrading (Optional)

If you need:
- **Always-on service** (no spin-down): $7/month
- **More RAM**: $7/month per 512MB
- **Custom domain**: Free (just add DNS records)

---

## 📞 Need Help?

- Render Docs: [render.com/docs](https://render.com/docs)
- Render Support: [render.com/support](https://render.com/support)
- Check deployment logs in Render Dashboard

---

## ✅ Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Render
- [ ] Environment variables set
- [ ] Persistent disk added
- [ ] Tested creating a product
- [ ] Tested file upload
- [ ] Shared URL with team

**Congratulations! Your app is now live! 🎊**
