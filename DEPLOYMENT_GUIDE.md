# Deploy InfoPlus Frontend to Vercel

## Quick Deploy Steps:

### 1. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `InfoPlus-frontend` (or any name you prefer)
3. **Keep it Public** (or Private if you have a paid plan)
4. **DO NOT** initialize with README, .gitignore, or license (we already have them)
5. Click "Create repository"

### 2. Push Your Code to GitHub
After creating the repository, GitHub will show you commands. Use these:

```powershell
cd "c:\Users\Brunda.HY\OneDrive - Brillio\Documents\GitHub\InfoPlus-frontend"
git remote add origin https://github.com/YOUR_USERNAME/InfoPlus-frontend.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 3. Deploy to Vercel
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository (you may need to connect GitHub first)
4. Select `InfoPlus-frontend` repository
5. **Important:** Set Root Directory to `frontend` (since your Next.js app is in the frontend folder)
6. Add Environment Variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://info-plus-backend.vercel.app/api`
7. Click "Deploy"

### 4. Update Backend CORS
After deployment, you'll get a URL like: `https://info-plus-frontend.vercel.app`

Tell your backend developer to add this URL to CORS allowed origins:
```javascript
cors({
  origin: [
    'http://localhost:3000',
    'https://info-plus-frontend.vercel.app'  // Add this
  ],
  credentials: true
})
```

### 5. Update OAuth Redirect URLs
In your backend environment variables, set:
```
FRONTEND_URL=https://info-plus-frontend.vercel.app
```

After OAuth login, backend should redirect to:
```
https://info-plus-frontend.vercel.app/chat
```

---

## Alternative: Use Vercel CLI (Faster)

If you have Vercel CLI installed:

```powershell
cd "c:\Users\Brunda.HY\OneDrive - Brillio\Documents\GitHub\InfoPlus-frontend\frontend"
vercel
```

Follow the prompts and it will deploy automatically!

---

## Need Help?
Let me know if you get stuck at any step!
