# 🔧 Fix Railway Deployment Error

The error shows Railway can't find the `client` directory. Here's how to fix it:

---

## ✅ Solution: Create Separate Services

Railway needs **TWO separate services** - one for backend, one for frontend.

---

## Step 1: Delete Current Service (if needed)

If you already created a service that's failing:
1. Go to Railway dashboard
2. Click on the failing service
3. Go to "Settings" → Scroll down → "Delete Service"
4. Confirm deletion

---

## Step 2: Deploy Backend Service

1. **In Railway project, click "+ New"**
2. **Select "GitHub Repo"**
3. **Select your `product-workflow-app` repository**
4. **Configure:**
   - **Service Name:** `backend` or `api`
   - **Root Directory:** `server` ⚠️ **CRITICAL!**
   - **Build Command:** (leave empty or `npm install`)
   - **Start Command:** `node index.js`
5. **Add Volume:**
   - Click "Volumes" tab
   - "Add Volume"
   - Mount Path: `/app` or `/server`
   - Size: 1 GB
6. **Add Environment Variables:**
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
7. **Generate Domain:**
   - Settings → Networking → "Generate Domain"
   - **Copy the URL** (e.g., `https://backend-production-xxxx.up.railway.app`)

---

## Step 3: Deploy Frontend Service (Separate!)

1. **In the SAME Railway project, click "+ New" again**
2. **Select "GitHub Repo"** (same repo)
3. **Configure:**
   - **Service Name:** `frontend` or `web`
   - **Root Directory:** `client` ⚠️ **CRITICAL!**
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npx serve -s build -l 3000`
4. **Add Environment Variable:**
   - `REACT_APP_API_URL` = (paste backend URL from Step 2)
   - **No trailing slash!**
5. **Generate Domain:**
   - Settings → Networking → "Generate Domain"
   - **Copy the URL** (e.g., `https://frontend-production-xxxx.up.railway.app`)

---

## ✅ Important Settings

### Backend Service:
- ✅ Root Directory: `server`
- ✅ Start Command: `node index.js`
- ✅ Volume mounted for persistent storage

### Frontend Service:
- ✅ Root Directory: `client` (NOT root!)
- ✅ Build Command: `npm install && npm run build`
- ✅ Start Command: `npx serve -s build -l 3000`
- ✅ Environment Variable: `REACT_APP_API_URL`

---

## 🆘 If Still Getting Errors

### Option A: Use Dockerfiles (I've created them)

I've created `server/Dockerfile` and `client/Dockerfile` for you.

1. **Backend Service:**
   - Root Directory: `server`
   - Railway will auto-detect Dockerfile
   - Or set Build Command: `docker build -t backend . && docker run backend`

2. **Frontend Service:**
   - Root Directory: `client`
   - Railway will auto-detect Dockerfile

### Option B: Check Root Directory

Make absolutely sure:
- Backend Root Directory = `server` (exactly, no slash)
- Frontend Root Directory = `client` (exactly, no slash)

### Option C: Verify Files on GitHub

1. Go to your GitHub repo
2. Check that `client/` folder exists
3. Check that `server/` folder exists
4. If missing, re-upload files

---

## 📋 Quick Checklist

- [ ] Two separate services created
- [ ] Backend Root Directory = `server`
- [ ] Frontend Root Directory = `client`
- [ ] Backend has volume mounted
- [ ] Frontend has `REACT_APP_API_URL` set
- [ ] Both services have domains generated
- [ ] Both services show "Active" status

---

## 🎯 Most Common Issue

**The error happens when Railway tries to build from root directory instead of `client/`.**

**Fix:** Make absolutely sure the **Root Directory** is set to `client` (for frontend) and `server` (for backend) in Railway settings.

---

**Try this and let me know if it works!** 🚀
