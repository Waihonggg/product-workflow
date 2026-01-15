# 🚀 Deploy to Railway (FREE with Persistent Storage!)

Railway includes **free persistent storage** - perfect for your database and files!

---

## Why Railway?

✅ **Free $5 credit/month** (plenty for small apps)  
✅ **Persistent volumes included** (no extra cost)  
✅ **Easy deployment** (similar to Render)  
✅ **Auto-deploy from GitHub**  

---

## Step 1: Push Code to GitHub

### Using GitHub Web Interface:

1. **Go to:** https://github.com/new
2. **Repository name:** `product-workflow-app`
3. **Make it Public** ✅
4. **Don't check** README, .gitignore, or license
5. **Click "Create repository"**
6. **Click "uploading an existing file"**
7. **Drag ALL files** from: `C:\Users\Wai Hong\Desktop\new project`
8. **Commit message:** "Initial commit"
9. **Click "Commit changes"**

✅ **Done!** Your code is on GitHub.

---

## Step 2: Deploy Backend to Railway

1. **Go to Railway:**
   - Visit: https://railway.app
   - Click "Login" → "Login with GitHub"
   - Authorize Railway

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Find and select your `product-workflow-app` repository

3. **Configure Backend:**
   - Railway will detect it's a Node.js app
   - Click on the service that was created
   - Go to "Settings" tab
   - **Root Directory:** Set to `server`
   - **Start Command:** `node index.js`
   - **Save**

4. **Add Persistent Volume (for database & files):**
   - In your backend service, click **"Volumes"** tab
   - Click **"Add Volume"**
   - **Name:** `data-storage`
   - **Mount Path:** `/server` (or `/app/server`)
   - **Size:** 1 GB (free tier)
   - Click **"Create"**

5. **Add Environment Variables:**
   - Go to "Variables" tab
   - Add:
     - `NODE_ENV` = `production`
     - `PORT` = `5000` (Railway sets this automatically, but add it anyway)

6. **Get Your Backend URL:**
   - Go to "Settings" → "Networking"
   - Click "Generate Domain"
   - **Copy the URL** (e.g., `https://product-workflow-api.up.railway.app`)
   - **SAVE THIS URL** - You'll need it!

7. **Wait for deployment** (2-3 minutes)
   - Watch the "Deployments" tab
   - Wait for "Active" status
   - ✅ Backend deployed!

---

## Step 3: Deploy Frontend to Railway

1. **Add New Service:**
   - In your Railway project, click **"+ New"**
   - Select **"GitHub Repo"**
   - Select same `product-workflow-app` repository

2. **Configure Frontend:**
   - Click on the new service
   - Go to "Settings"
   - **Root Directory:** Set to `client`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npx serve -s build -l 3000`
   - **Save**

3. **Add Environment Variable:**
   - Go to "Variables" tab
   - Click **"New Variable"**
   - **Key:** `REACT_APP_API_URL`
   - **Value:** Paste your backend URL from Step 2
   - **IMPORTANT:** No trailing slash!
   - Click **"Add"**

4. **Get Your Frontend URL:**
   - Go to "Settings" → "Networking"
   - Click "Generate Domain"
   - **Copy the URL** (e.g., `https://product-workflow-frontend.up.railway.app`)

5. **Wait for deployment** (3-5 minutes)
   - Watch the "Deployments" tab
   - Wait for "Active" status
   - ✅ Frontend deployed!

---

## Step 4: Test Your App

1. **Open your frontend URL** in browser
2. **Test features:**
   - Create a product ✅
   - Upload a file ✅
   - Update workflow steps ✅

---

## ✅ Success!

Your app is live at: `https://your-frontend-name.up.railway.app`

**Share this URL with your team!**

---

## 💰 Railway Free Tier

- **$5 credit/month** (usually enough for 1-2 small apps)
- **Persistent volumes included** ✅
- **Auto-deploy from GitHub** ✅
- **Custom domains** (free)
- **HTTPS included** ✅

**Note:** If you exceed $5/month, Railway will pause your services. For small apps, you'll likely stay well under the limit!

---

## 🔧 Troubleshooting

### Backend won't start:
- Check Root Directory is `server`
- Check Start Command: `node index.js`
- Check logs in "Deployments" tab

### Frontend can't connect:
- Verify `REACT_APP_API_URL` is set correctly
- Make sure backend URL has no trailing slash
- Check backend is running (green status)

### Files not saving:
- Verify volume is mounted correctly
- Check volume mount path: `/server`
- Check logs for errors

### Need to update:
- Just push to GitHub
- Railway auto-deploys!

---

## 🎉 You're Done!

Railway is perfect because:
- ✅ Free persistent storage (no disk issues!)
- ✅ Easy to use
- ✅ Auto-deploys from GitHub
- ✅ Professional URLs

**Your app is live! 🚀**
