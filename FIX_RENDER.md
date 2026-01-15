# 🔧 Fix Render "Root directory does not exist" Error

The error means Render can't find the `server` folder in your GitHub repo. Let's fix it!

---

## 🎯 Quick Fix (Choose One)

### Option 1: Check GitHub Repository Structure

1. **Go to your GitHub repo:**
   - Visit: https://github.com/Waihonggg/product-workflow
   - Check if you see a `server/` folder
   - Check if you see a `client/` folder

2. **If folders are missing:**
   - The files weren't uploaded correctly
   - See "Option 2" below to re-upload

3. **If folders exist:**
   - The Root Directory setting is wrong
   - See "Option 3" below

---

### Option 2: Re-Upload Files to GitHub (If Missing)

If `server/` and `client/` folders don't exist on GitHub:

1. **Go to your GitHub repo:**
   - https://github.com/Waihonggg/product-workflow

2. **Delete everything:**
   - Click on each file/folder
   - Click "Delete" button
   - Commit the deletions

3. **Upload correctly:**
   - Click "Add file" → "Upload files"
   - Open File Explorer: `C:\Users\Wai Hong\Desktop\new project`
   - **Select ALL files and folders** (including `server/` and `client/` folders)
   - Drag them into GitHub
   - Commit message: "Upload all files"
   - Click "Commit changes"

4. **Verify structure:**
   - You should see:
     - `server/` folder (with index.js, package.json, etc.)
     - `client/` folder (with src/, public/, package.json, etc.)
     - Other files (README.md, etc.)

5. **Redeploy on Render:**
   - Go to Render dashboard
   - Click "Manual Deploy" → "Deploy latest commit"

---

### Option 3: Fix Root Directory Setting (If Folders Exist)

If `server/` and `client/` folders exist on GitHub:

1. **Go to Render Dashboard:**
   - https://dashboard.render.com
   - Click on your `product-workflow` service

2. **Go to Settings:**
   - Click "Settings" tab
   - Scroll to "Build & Deploy"

3. **Check Root Directory:**
   - Current setting might be wrong
   - **Should be:** `server` (exactly, no slash, no path)
   - **NOT:** `/server` or `./server` or empty

4. **Fix it:**
   - If it's wrong, change to: `server`
   - Click "Save Changes"

5. **Redeploy:**
   - Go to "Events" tab
   - Click "Manual Deploy" → "Deploy latest commit"

---

## 🔍 How to Check Your GitHub Structure

1. **Visit:** https://github.com/Waihonggg/product-workflow
2. **You should see:**
   ```
   product-workflow/
   ├── server/
   │   ├── index.js
   │   ├── package.json
   │   └── ...
   ├── client/
   │   ├── src/
   │   ├── package.json
   │   └── ...
   ├── README.md
   └── ...
   ```

3. **If you see files directly (not in folders):**
   - Files weren't uploaded correctly
   - Use Option 2 to re-upload

---

## ✅ Correct Render Settings

### Backend Service:
- **Root Directory:** `server` (exactly this, nothing else)
- **Build Command:** `npm install`
- **Start Command:** `node index.js`
- **Environment:** Node

### Frontend Service (when you create it):
- **Root Directory:** `client` (exactly this)
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `build`
- **Environment:** Static Site

---

## 🆘 Still Not Working?

### Check 1: Verify on GitHub
- Go to: https://github.com/Waihonggg/product-workflow/tree/main
- Do you see `server/` folder? Click it.
- Do you see `index.js` inside? ✅
- If not, files are in wrong location

### Check 2: Render Settings
- Root Directory must be exactly: `server`
- Not: `/server`, `./server`, `server/`, or empty
- Case-sensitive: `server` not `Server`

### Check 3: Re-upload Everything
- Delete all files on GitHub
- Re-upload from your local folder
- Make sure folder structure is preserved

---

## 📋 Step-by-Step Fix

1. **Check GitHub:** https://github.com/Waihonggg/product-workflow
   - [ ] Do you see `server/` folder?
   - [ ] Do you see `client/` folder?

2. **If NO folders:**
   - [ ] Delete all files on GitHub
   - [ ] Re-upload from `C:\Users\Wai Hong\Desktop\new project`
   - [ ] Make sure to include `server/` and `client/` folders

3. **If YES folders exist:**
   - [ ] Go to Render Settings
   - [ ] Check Root Directory = `server`
   - [ ] Save and redeploy

4. **Redeploy:**
   - [ ] Render Dashboard → Manual Deploy
   - [ ] Wait for build to complete

---

## 🎯 Most Likely Issue

**Files were uploaded to GitHub root instead of preserving folder structure.**

**Fix:** Re-upload files making sure `server/` and `client/` folders are included.

---

**Try Option 2 first (re-upload), then Option 3 (fix settings). Let me know what you see on GitHub!**
