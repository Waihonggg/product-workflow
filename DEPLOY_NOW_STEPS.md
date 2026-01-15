# 🚀 Deploy to Free Hosting - Step by Step

Your repository: https://github.com/Waihonggg/product-workflow

## Step 1: Deploy Backend to Render (5 minutes)

1. **Go to Render:**
   - Visit: https://render.com
   - Click "Get Started for Free"
   - Sign up with GitHub (use your GitHub account)

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect GitHub → Select your `product-workflow` repository
   - Click "Connect"

3. **Configure Backend Settings:**
   - **Name:** `product-workflow-api` (or any name you like)
   - **Environment:** `Node`
   - **Region:** Choose closest to you (e.g., Singapore, US East)
   - **Branch:** `main`
   - **Root Directory:** `server` ⚠️ **IMPORTANT!**
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Plan:** Select **Free** ✅

4. **Add Environment Variables:**
   - Scroll down to "Environment Variables"
   - Click "Add Environment Variable"
   - Add:
     - **Key:** `NODE_ENV`
     - **Value:** `production`
   - Click "Add Environment Variable" again
   - Add:
     - **Key:** `PORT`
     - **Value:** `5000`

5. **Deploy:**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - **Copy the URL** (e.g., `https://product-workflow-api.onrender.com`)
   - **SAVE THIS URL!** You'll need it for Step 2

⚠️ **Note:** Free tier spins down after 15 min inactivity. First request takes ~30 seconds (cold start).

---

## Step 2: Deploy Frontend to Vercel (5 minutes)

1. **Go to Vercel:**
   - Visit: https://vercel.com
   - Click "Sign Up" → "Continue with GitHub"
   - Authorize Vercel

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Import your `product-workflow` repository
   - Click "Import"

3. **Configure Frontend:**
   - **Framework Preset:** Create React App (should auto-detect)
   - **Root Directory:** Click "Edit" → Change to `client` ⚠️ **IMPORTANT!**
   - **Build Command:** `npm run build` (should be auto-filled)
   - **Output Directory:** `build` (should be auto-filled)

4. **Add Environment Variable:**
   - Scroll to "Environment Variables"
   - Click "Add"
   - **Key:** `REACT_APP_API_URL`
   - **Value:** Paste your Render backend URL from Step 1
   - **IMPORTANT:** No trailing slash! (e.g., `https://product-workflow-api.onrender.com`)
   - Click "Add"

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - **Your app is live!** 🎉
   - URL: `https://product-workflow-xxxxx.vercel.app`

---

## ✅ Success!

Your app is now **100% FREE** and live at:
- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-api.onrender.com`

**Share the frontend URL with your team!**

---

## 🔄 Updating Your App

1. Make changes locally
2. Push to GitHub (using GitHub Desktop)
3. Render & Vercel auto-deploy (2-3 minutes)
4. Done!

---

## 🆘 Troubleshooting

### Backend won't start:
- Check Root Directory is `server` (not root)
- Check Build Command: `npm install`
- Check Start Command: `node index.js`
- Check logs in Render dashboard

### Frontend can't connect:
- Verify `REACT_APP_API_URL` is set correctly
- Make sure backend URL has no trailing slash
- Check backend is running (may need to wake it up - first request takes ~30 sec)

### Slow first request:
- Normal for Render free tier (cold start)
- Takes ~30 seconds on first request after spin-down
- Subsequent requests are fast
