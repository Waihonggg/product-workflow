# 🚀 Deploy Now - Step by Step Guide

Since you're already logged into GitHub and Render, let's deploy your app! Follow these steps:

---

## Part 1: Push Code to GitHub

### Option A: Using GitHub Desktop (Easiest)

1. **Download GitHub Desktop** (if not installed):
   - Go to: https://desktop.github.com/
   - Install and sign in with your GitHub account

2. **Add Repository:**
   - Click "File" → "Add Local Repository"
   - Browse to: `C:\Users\Wai Hong\Desktop\new project`
   - Click "Add Repository"

3. **Commit and Push:**
   - You'll see all your files listed
   - Type commit message: "Initial commit - Product Workflow App"
   - Click "Commit to main"
   - Click "Publish repository" (or "Push origin" if already published)
   - Make sure it's set to **Public** (required for free Render)

### Option B: Using GitHub Web Interface

1. **Create New Repository:**
   - Go to: https://github.com/new
   - Repository name: `product-workflow-app`
   - Description: "Product Development Workflow Management System"
   - Make it **Public** ✅
   - **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Upload Files:**
   - GitHub will show "uploading an existing file" option
   - Or use: https://github.com/new/import
   - Drag and drop all files from your project folder
   - Commit message: "Initial commit"
   - Click "Commit changes"

### Option C: Install Git and Use Command Line

1. **Install Git:**
   - Download: https://git-scm.com/download/win
   - Install with default settings
   - Restart your terminal

2. **Then run these commands:**
   ```bash
   cd "C:\Users\Wai Hong\Desktop\new project"
   git init
   git add .
   git commit -m "Initial commit - Product Workflow App"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/product-workflow-app.git
   git push -u origin main
   ```
   (Replace YOUR_USERNAME with your GitHub username)

---

## Part 2: Deploy Backend to Render

1. **Go to Render Dashboard:**
   - Visit: https://dashboard.render.com
   - You should be logged in

2. **Create New Web Service:**
   - Click the **"New +"** button (top right)
   - Select **"Web Service"**

3. **Connect GitHub:**
   - Click **"Connect GitHub"** or **"Connect account"**
   - Authorize Render to access your repositories
   - Select your `product-workflow-app` repository

4. **Configure Backend:**
   - **Name:** `product-workflow-api` (or any name you like)
   - **Environment:** Select **"Node"**
   - **Region:** Choose closest to you (e.g., Singapore, US East)
   - **Branch:** `main`
   - **Root Directory:** Type `server` (IMPORTANT!)
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Plan:** Select **"Free"**

5. **Add Persistent Disk (for database & files):**
   - Scroll down to **"Disks"** section
   - Click **"Add Disk"**
   - **Name:** `product-data`
   - **Mount Path:** `/opt/render/project/src/server`
   - **Size:** `1 GB` (free tier limit)
   - Click **"Save"**

6. **Advanced Settings (Optional but Recommended):**
   - Click **"Advanced"**
   - Add Environment Variables:
     - **Key:** `NODE_ENV`
     - **Value:** `production`
     - Click **"Add"**
     - **Key:** `PORT`
     - **Value:** `5000`
     - Click **"Add"**

7. **Deploy:**
   - Scroll down and click **"Create Web Service"**
   - Wait 2-3 minutes for deployment
   - You'll see build logs - wait for "Your service is live"
   - **Copy the URL** (e.g., `https://product-workflow-api.onrender.com`)
   - **SAVE THIS URL** - You'll need it for frontend!

---

## Part 3: Deploy Frontend to Render

1. **Create New Static Site:**
   - In Render Dashboard, click **"New +"**
   - Select **"Static Site"**

2. **Connect Repository:**
   - Connect to same GitHub account
   - Select same `product-workflow-app` repository

3. **Configure Frontend:**
   - **Name:** `product-workflow-frontend` (or any name)
   - **Branch:** `main`
   - **Root Directory:** Type `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** Type `build`
   - **Plan:** Select **"Free"**

4. **Add Environment Variable (CRITICAL!):**
   - Scroll to **"Environment Variables"**
   - Click **"Add Environment Variable"**
   - **Key:** `REACT_APP_API_URL`
   - **Value:** Paste your backend URL from Part 2 (e.g., `https://product-workflow-api.onrender.com`)
   - **IMPORTANT:** No trailing slash!
   - Click **"Add"**

5. **Deploy:**
   - Click **"Create Static Site"**
   - Wait 3-5 minutes for build and deployment
   - You'll see build progress
   - When done, you'll get a URL like: `https://product-workflow-frontend.onrender.com`

---

## Part 4: Test Your Deployment

1. **Visit your frontend URL:**
   - Open: `https://product-workflow-frontend.onrender.com`
   - You should see your app!

2. **Test Features:**
   - Create a new product
   - Update workflow steps
   - Upload a file attachment
   - Check if everything works

3. **If something doesn't work:**
   - Check Render logs (click on service → "Logs" tab)
   - Verify environment variables are set correctly
   - Make sure backend URL in frontend env var is correct

---

## ✅ Success Checklist

- [ ] Code pushed to GitHub (public repository)
- [ ] Backend deployed on Render
- [ ] Persistent disk added to backend
- [ ] Frontend deployed on Render
- [ ] `REACT_APP_API_URL` environment variable set correctly
- [ ] App loads and works correctly
- [ ] Can create products
- [ ] Can upload files

---

## 🎉 You're Done!

Your app is now live at: `https://product-workflow-frontend.onrender.com`

**Share this URL with your colleagues - they can access it from anywhere!**

---

## 📝 Important Notes

### Free Tier Limitations:
- **Spins down after 15 min inactivity** (wakes up automatically on next request)
- **First request after spin-down takes ~30 seconds** (cold start)
- This is normal for free tier!

### Updating Your App:
1. Make changes locally
2. Push to GitHub (commit & push)
3. Render automatically redeploys (2-3 minutes)

### Need Help?
- Check Render logs for errors
- Verify environment variables
- Make sure Root Directory is set correctly (`server` for backend, `client` for frontend)

---

## 🆘 Troubleshooting

**Backend won't start:**
- Check Root Directory is `server` (not root)
- Verify Build Command: `npm install`
- Verify Start Command: `node index.js`
- Check logs for errors

**Frontend can't connect:**
- Verify `REACT_APP_API_URL` is set
- Make sure URL has no trailing slash
- Check CORS in backend (already configured)

**Files not saving:**
- Verify persistent disk is mounted
- Check disk mount path: `/opt/render/project/src/server`

**Need to update:**
- Just push changes to GitHub
- Render auto-deploys

---

**Ready? Start with Part 1!** 🚀
