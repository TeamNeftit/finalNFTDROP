# 🔧 VERCEL DEPLOYMENT FIX - COMPLETE SOLUTION

## 🚨 THE PROBLEM

Your API routes return 404 because Vercel isn't deploying the serverless functions properly.

**Why it works on localhost:**
- ✅ `node server.js` runs a full Express server on port 3001
- ✅ All routes (`/api/*`, `/auth/*`) work normally
- ✅ Server keeps state in memory

**Why it fails on Vercel:**
- ❌ Vercel only deploys static files from `/dist`
- ❌ API functions in `/api` folder aren't being recognized
- ❌ No backend server running

---

## ✅ SOLUTION: DEPLOY BACKEND SEPARATELY

Since Vercel serverless has been problematic, the **BEST solution** is to deploy your backend to a service designed for Node.js servers.

### **OPTION 1: RAILWAY (RECOMMENDED) - 10 MINUTES**

#### **Step 1: Deploy Backend to Railway**
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Railway will auto-detect Node.js and deploy

#### **Step 2: Add Environment Variables in Railway**
```env
PORT=3001
BASE_URL=https://www.neftit.site
X_CLIENT_ID=your_x_client_id
X_CLIENT_SECRET=your_x_client_secret
X_REDIRECT_URI=https://www.neftit.site/auth/x/callback
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=https://www.neftit.site/auth/discord/callback
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_GUILD_ID=1369232763709947914
DISCORD_INVITE_LINK=https://discord.com/invite/Xc54PrHv7w
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
NEFTIT_X_USERNAME=neftitxyz
```

#### **Step 3: Get Railway URL**
Railway will give you a URL like: `https://nftdrop-production.up.railway.app`

#### **Step 4: Update Frontend to Use Railway Backend**
Create `public/api-config.js`:
```javascript
// Backend API URL - Railway deployment
window.API_BACKEND_URL = 'https://nftdrop-production.up.railway.app';
```

Update `index.html` to load this before other scripts:
```html
<script src="/api-config.js"></script>
```

Update `script.js` to use the backend URL:
```javascript
// At the top of script.js
const API_URL = window.API_BACKEND_URL || window.location.origin;

// Then in fetch calls:
fetch(`${API_URL}/api/config`)
fetch(`${API_URL}/api/participant-count`)
// etc.
```

---

### **OPTION 2: RENDER.COM (ALTERNATIVE)**

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
6. Add all environment variables
7. Deploy
8. Get URL and update frontend (same as Railway)

---

### **OPTION 3: FIX VERCEL (HARDER)**

If you really want to use Vercel for everything, you need to:

1. **Remove the `/api` folder approach**
2. **Use Vercel's serverless function format**
3. **Create `/api` routes that match Vercel's requirements**

But this is complex and has limitations (stateless, cold starts, etc.)

---

## 🎯 RECOMMENDED ARCHITECTURE

```
┌─────────────────────────────────────┐
│  FRONTEND (Vercel)                  │
│  https://www.neftit.site            │
│                                     │
│  - Static React app                 │
│  - Served from /dist                │
│  - Fast CDN delivery                │
└──────────────┬──────────────────────┘
               │
               │ API Calls
               ↓
┌─────────────────────────────────────┐
│  BACKEND (Railway/Render)           │
│  https://nftdrop-production...      │
│                                     │
│  - Full Express server              │
│  - OAuth routes                     │
│  - Database connections             │
│  - Stateful sessions                │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│  DATABASE (Supabase)                │
│                                     │
│  - User data                        │
│  - OAuth states                     │
│  - Referrals                        │
└─────────────────────────────────────┘
```

---

## ⚡ QUICK START (Railway)

```bash
# 1. Go to Railway and deploy your repo
# 2. Add environment variables
# 3. Get your Railway URL
# 4. Create api-config.js with Railway URL
# 5. Update script.js to use API_URL
# 6. Rebuild and redeploy frontend
# 7. Test - everything will work!
```

---

## 🔒 SECURITY REMINDER

**IMPORTANT:** Your `.env` file was exposed on GitHub earlier!

Make sure you've regenerated:
- ✅ Discord Bot Token
- ✅ Discord OAuth credentials
- ✅ X OAuth credentials  
- ✅ Supabase keys (if possible)

See `SECURITY_BREACH_RESPONSE.md` for details.

---

## 📞 NEED HELP?

If you want me to implement the Railway solution, just say:
**"Deploy backend to Railway"**

And I'll create all the necessary files and configurations!
