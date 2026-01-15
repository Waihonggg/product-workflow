# ⚡ Quick Free Deploy (3 Steps)

**100% FREE - No Credit Card Needed!**

---

## Step 1: Push to GitHub (5 min)
1. Go to: https://github.com/new
2. Name: `product-workflow-app` (Public)
3. Upload all files
4. Commit

---

## Step 2: Deploy Backend to Render (5 min)
1. Go to: https://render.com → Sign up (free)
2. "New Web Service" → Connect GitHub
3. Settings:
   - Root: `server`
   - Build: `npm install`
   - Start: `node index.js`
   - Plan: **Free**
4. Copy backend URL

---

## Step 3: Deploy Frontend to Vercel (5 min)
1. Go to: https://vercel.com → Sign up (free)
2. "Add New Project" → Import GitHub repo
3. Settings:
   - Root: `client`
   - Framework: Create React App
4. Add Variable:
   - `REACT_APP_API_URL` = backend URL
5. Deploy!

**Done! 🎉**

---

**Full guide:** See `DEPLOY_FREE.md`
