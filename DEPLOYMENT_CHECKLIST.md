# ✅ Deployment Checklist

## Pre-Deployment Checks

- [x] Code is on GitHub: https://github.com/Waihonggg/product-workflow
- [x] Dependencies are installed
- [x] Environment variables configured correctly
- [x] CORS settings allow frontend origin
- [x] File upload directory exists

## Deployment Steps

### Step 1: Render (Backend) ✅ Ready
- [ ] Sign up at https://render.com
- [ ] Create Web Service
- [ ] Connect GitHub repo
- [ ] Set Root Directory: `server`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `node index.js`
- [ ] Add Environment Variables:
  - `NODE_ENV` = `production`
  - `PORT` = `5000`
- [ ] Copy backend URL

### Step 2: Vercel (Frontend) ✅ Ready
- [ ] Sign up at https://vercel.com
- [ ] Import GitHub repo
- [ ] Set Root Directory: `client`
- [ ] Add Environment Variable:
  - `REACT_APP_API_URL` = (your Render backend URL)
- [ ] Deploy

## Post-Deployment

- [ ] Test frontend URL
- [ ] Test backend API
- [ ] Verify file uploads work
- [ ] Share frontend URL with team

## Important URLs

- **GitHub Repo:** https://github.com/Waihonggg/product-workflow
- **Backend URL:** (will be provided by Render)
- **Frontend URL:** (will be provided by Vercel)
