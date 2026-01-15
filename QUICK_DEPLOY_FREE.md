# ⚡ Quick Free Deploy - Follow These Steps

## 🎯 Your GitHub Repo
**https://github.com/Waihonggg/product-workflow**

---

## 📋 Step 1: Deploy Backend to Render (FREE)

### 1.1 Sign Up
- Go to: **https://render.com**
- Click **"Get Started for Free"**
- Sign up with **GitHub** (use your GitHub account)

### 1.2 Create Web Service
- Click **"New +"** → **"Web Service"**
- Click **"Connect GitHub"**
- Select your **`product-workflow`** repository
- Click **"Connect"**

### 1.3 Configure Settings
Fill in these **EXACT** values:

| Setting | Value |
|---------|-------|
| **Name** | `product-workflow-api` |
| **Environment** | `Node` |
| **Region** | Choose closest (Singapore/US East) |
| **Branch** | `main` |
| **Root Directory** | `server` ⚠️ **CRITICAL!** |
| **Build Command** | `npm install` |
| **Start Command** | `node index.js` |
| **Plan** | **Free** ✅ |

### 1.4 Add Environment Variables
Scroll to **"Environment Variables"** section:
- Click **"Add Environment Variable"**
  - Key: `NODE_ENV`
  - Value: `production`
- Click **"Add Environment Variable"** again
  - Key: `PORT`
  - Value: `5000`

### 1.5 Deploy
- Click **"Create Web Service"**
- Wait 2-3 minutes
- **Copy the URL** (e.g., `https://product-workflow-api.onrender.com`)
- **📝 SAVE THIS URL!** You need it for Step 2

---

## 📋 Step 2: Deploy Frontend to Vercel (FREE)

### 2.1 Sign Up
- Go to: **https://vercel.com**
- Click **"Sign Up"**
- Click **"Continue with GitHub"**
- Authorize Vercel

### 2.2 Import Project
- Click **"Add New..."** → **"Project"**
- Find your **`product-workflow`** repository
- Click **"Import"**

### 2.3 Configure Settings
- **Framework Preset:** `Create React App` (auto-detected)
- **Root Directory:** Click **"Edit"** → Change to: `client` ⚠️ **CRITICAL!**
- **Build Command:** `npm run build` (auto-filled)
- **Output Directory:** `build` (auto-filled)

### 2.4 Add Environment Variable
Scroll to **"Environment Variables"**:
- Click **"Add"**
- **Key:** `REACT_APP_API_URL`
- **Value:** Paste your Render URL from Step 1.5
  - Example: `https://product-workflow-api.onrender.com`
  - ⚠️ **NO trailing slash!**
- Click **"Add"**

### 2.5 Deploy
- Click **"Deploy"**
- Wait 2-3 minutes
- **🎉 Your app is LIVE!**
- URL: `https://product-workflow-xxxxx.vercel.app`

---

## ✅ Done!

Your app is now **100% FREE** and accessible worldwide:
- **Frontend:** `https://your-app.vercel.app` (always on!)
- **Backend:** `https://your-api.onrender.com` (free tier)

**Share the frontend URL with anyone!**

---

## 🔄 Update Your App Later

1. Make changes locally
2. Push to GitHub (using GitHub Desktop)
3. Render & Vercel **auto-deploy** (2-3 minutes)
4. Done!

---

## ⚠️ Important Notes

### Render Free Tier:
- Spins down after 15 min inactivity
- First request takes ~30 seconds (cold start)
- Subsequent requests are fast

### Vercel Free Tier:
- ✅ Always on (never spins down!)
- ✅ Unlimited bandwidth
- ✅ Auto-deploy from GitHub
- ✅ HTTPS included

---

## 🆘 Need Help?

### Backend Issues:
- Check Root Directory is `server` (not root)
- Check logs in Render dashboard
- Verify environment variables are set

### Frontend Issues:
- Check Root Directory is `client`
- Verify `REACT_APP_API_URL` has no trailing slash
- Wait ~30 seconds for first request (cold start)

---

**Ready? Start with Step 1!** 🚀
