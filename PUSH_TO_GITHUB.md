# 📤 Push Code to GitHub Using Git

## Prerequisites

✅ Git installed (download from https://git-scm.com/download/win)  
✅ GitHub repository created: https://github.com/Waihonggg/product-workflow  
✅ You're logged into GitHub  

---

## Commands to Run

Open PowerShell or Command Prompt in your project folder, then run:

### 1. Navigate to Project
```bash
cd "C:\Users\Wai Hong\Desktop\new project"
```

### 2. Initialize Git Repository
```bash
git init
```

### 3. Add All Files
```bash
git add .
```

### 4. Create First Commit
```bash
git commit -m "Initial commit - Product Workflow App"
```

### 5. Add GitHub Remote
```bash
git remote add origin https://github.com/Waihonggg/product-workflow.git
```

### 6. Set Main Branch
```bash
git branch -M main
```

### 7. Push to GitHub
```bash
git push -u origin main
```

**Note:** You'll be asked for GitHub username and password (or token)

---

## If You Get Authentication Error

GitHub requires a Personal Access Token instead of password:

1. **Create Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name: "Product Workflow"
   - Expiration: 90 days (or no expiration)
   - Scopes: Check "repo" ✅
   - Click "Generate token"
   - **COPY THE TOKEN** (you won't see it again!)

2. **Use Token:**
   - When Git asks for password, paste the token instead
   - Username: Your GitHub username

---

## Verify Upload

After pushing, check:
- https://github.com/Waihonggg/product-workflow
- You should see `server/` and `client/` folders
- Click `server/` → should see `index.js` inside

---

## Troubleshooting

### "git is not recognized"
- Git not installed or not in PATH
- Install from: https://git-scm.com/download/win
- Restart terminal after installing

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/Waihonggg/product-workflow.git
```

### "Authentication failed"
- Use Personal Access Token (see above)
- Or use GitHub Desktop instead

### "Nothing to commit"
- Files might already be committed
- Check: `git status`
- If needed: `git add .` then `git commit -m "Update files"`

---

**Ready? Install Git first, then run the commands above!**
