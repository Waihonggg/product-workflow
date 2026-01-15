# ⚡ Quick Deploy - 3 Easy Steps

## Option 1: Render (Recommended - Easiest) ✅

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/product-workflow-app.git
git push -u origin main
```

### Step 2: Deploy Backend
1. Go to [render.com](https://render.com) → Sign up (free)
2. Click "New Web Service"
3. Connect GitHub → Select your repo
4. Settings:
   - **Root Directory:** `server`
   - **Build:** `npm install`
   - **Start:** `node index.js`
   - **Plan:** Free
5. Add Disk: 1GB, mount at `/opt/render/project/src/server`
6. Copy the URL (e.g., `https://your-api.onrender.com`)

### Step 3: Deploy Frontend
1. In Render → "New Static Site"
2. Connect same GitHub repo
3. Settings:
   - **Root Directory:** `client`
   - **Build:** `npm install && npm run build`
   - **Publish:** `build`
4. Add Environment Variable:
   - `REACT_APP_API_URL` = Your backend URL from Step 2
5. Done! 🎉

**Your app:** `https://your-frontend.onrender.com`

---

## Option 2: Vercel + Railway (Also Free)

### Backend (Railway):
1. Go to [railway.app](https://railway.app) → Sign up
2. "New Project" → "Deploy from GitHub"
3. Select repo → Settings:
   - **Root Directory:** `server`
   - **Start Command:** `node index.js`
4. Add Volume for `/server` (persistent storage)
5. Copy URL

### Frontend (Vercel):
1. Go to [vercel.com](https://vercel.com) → Sign up
2. "New Project" → Import GitHub repo
3. Settings:
   - **Root Directory:** `client`
   - **Framework Preset:** Create React App
4. Add Environment Variable:
   - `REACT_APP_API_URL` = Railway backend URL
5. Deploy!

---

## Which Should You Choose?

**Render:** ✅ Easier, one platform, persistent disks included  
**Vercel+Railway:** ✅ More features, separate services

**Recommendation:** Start with Render (simpler), migrate later if needed.

---

## Need Help?

See `DEPLOYMENT_GUIDE.md` for detailed step-by-step instructions with screenshots!
