# 🔧 Git Setup & Push to GitHub

## Step 1: Install Git

1. **Download Git:**
   - Go to: https://git-scm.com/download/win
   - Download the installer (it will auto-detect 64-bit or 32-bit)

2. **Install Git:**
   - Run the installer
   - Click "Next" through all steps (default settings are fine)
   - **Important:** Make sure "Add Git to PATH" is checked ✅
   - Click "Install"
   - Wait for installation to complete

3. **Restart your terminal/PowerShell:**
   - Close this window
   - Open a new PowerShell/Command Prompt
   - Or I'll help you refresh the PATH

---

## Step 2: Verify Git Installation

After installing, run:
```bash
git --version
```

You should see something like: `git version 2.xx.x`

---

## Step 3: Push Code to GitHub

Once Git is installed, I'll help you run these commands:

```bash
# Navigate to your project
cd "C:\Users\Wai Hong\Desktop\new project"

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Product Workflow App"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/Waihonggg/product-workflow.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🚀 Quick Install Link

**Download Git:** https://git-scm.com/download/win

**After installing, come back and I'll help you push the code!**
