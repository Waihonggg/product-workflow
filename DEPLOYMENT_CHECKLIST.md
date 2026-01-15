# ✅ Deployment Checklist

Print this or keep it open while deploying!

---

## Step 1: Push to GitHub ☐

### Using GitHub Web Interface:
- [ ] Go to https://github.com/new
- [ ] Repository name: `product-workflow-app`
- [ ] Make it **Public** ✅
- [ ] **Don't** check README, .gitignore, or license
- [ ] Click "Create repository"
- [ ] Click "uploading an existing file"
- [ ] Drag ALL files from: `C:\Users\Wai Hong\Desktop\new project`
- [ ] Commit message: "Initial commit"
- [ ] Click "Commit changes"
- [ ] ✅ Repository created!

---

## Step 2: Deploy Backend ☐

- [ ] Go to https://dashboard.render.com
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub → Select `product-workflow-app`
- [ ] **Name:** `product-workflow-api`
- [ ] **Environment:** Node
- [ ] **Region:** (choose closest)
- [ ] **Branch:** `main`
- [ ] **Root Directory:** `server` ⚠️ IMPORTANT!
- [ ] **Build Command:** `npm install`
- [ ] **Start Command:** `node index.js`
- [ ] **Plan:** Free
- [ ] **Add Disk:**
  - Name: `product-data`
  - Mount: `/opt/render/project/src/server`
  - Size: `1 GB`
- [ ] **Environment Variables:**
  - `NODE_ENV` = `production`
  - `PORT` = `5000`
- [ ] Click "Create Web Service"
- [ ] Wait 2-3 minutes
- [ ] **Copy Backend URL:** `https://________.onrender.com`
- [ ] ✅ Backend deployed!

---

## Step 3: Deploy Frontend ☐

- [ ] In Render Dashboard, click "New +" → "Static Site"
- [ ] Connect same GitHub repo: `product-workflow-app`
- [ ] **Name:** `product-workflow-frontend`
- [ ] **Branch:** `main`
- [ ] **Root Directory:** `client` ⚠️ IMPORTANT!
- [ ] **Build Command:** `npm install && npm run build`
- [ ] **Publish Directory:** `build`
- [ ] **Plan:** Free
- [ ] **Environment Variable:**
  - Key: `REACT_APP_API_URL`
  - Value: (paste backend URL from Step 2)
  - ⚠️ No trailing slash!
- [ ] Click "Create Static Site"
- [ ] Wait 3-5 minutes
- [ ] **Copy Frontend URL:** `https://________.onrender.com`
- [ ] ✅ Frontend deployed!

---

## Step 4: Test ☐

- [ ] Open frontend URL in browser
- [ ] App loads? ✅
- [ ] Create a test product? ✅
- [ ] Upload a file? ✅
- [ ] Update workflow step? ✅
- [ ] Everything works? ✅

---

## 🎉 Success!

Your app is live at: `https://________.onrender.com`

**Share this URL with your team!**

---

## 🆘 If Something Goes Wrong

### Backend Issues:
- [ ] Check Root Directory is `server` (not root)
- [ ] Check Build Command: `npm install`
- [ ] Check Start Command: `node index.js`
- [ ] Check logs in Render dashboard

### Frontend Issues:
- [ ] Check Root Directory is `client` (not root)
- [ ] Check `REACT_APP_API_URL` is set correctly
- [ ] Make sure backend URL has no trailing slash
- [ ] Check build logs in Render dashboard

### Connection Issues:
- [ ] Verify backend is running (check logs)
- [ ] Verify `REACT_APP_API_URL` matches backend URL exactly
- [ ] Wait a few minutes (first deploy can be slow)

---

**You've got this! 🚀**
