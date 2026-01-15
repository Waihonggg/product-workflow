# ⚡ Simplest Deployment - Railway

**No disks needed! Railway has built-in persistent storage.**

---

## 🎯 Quick Steps:

### 1. Push to GitHub (5 min)
- Go to: https://github.com/new
- Name: `product-workflow-app`
- Make it **Public**
- Upload all files (drag & drop)
- Commit

### 2. Deploy Backend (5 min)
- Go to: https://railway.app → Login with GitHub
- "New Project" → "Deploy from GitHub"
- Select your repo
- Settings:
  - Root: `server`
  - Start: `node index.js`
- Add Volume:
  - Click "Volumes" → "Add Volume"
  - Mount: `/server`
- Copy backend URL

### 3. Deploy Frontend (5 min)
- In Railway project → "+ New" → GitHub repo
- Settings:
  - Root: `client`
  - Build: `npm install && npm run build`
  - Start: `npx serve -s build -l 3000`
- Add Variable:
  - `REACT_APP_API_URL` = backend URL
- Generate domain

**Done! 🎉**

---

**Full guide:** See `DEPLOY_RAILWAY.md`
