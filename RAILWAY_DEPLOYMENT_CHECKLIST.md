# ✅ RAILWAY DEPLOYMENT CHECKLIST

## 🎯 YOUR RAILWAY URL
```
https://finalnftdrop-production.up.railway.app
```

---

## 🔧 REQUIRED ENVIRONMENT VARIABLES IN RAILWAY

Go to your Railway project → Variables tab and add these:

### **1. Server Configuration**
```env
PORT=3001
BASE_URL=https://www.neftit.site
```
⚠️ **IMPORTANT:** `BASE_URL` must be your FRONTEND URL (neftit.site), NOT the Railway URL!
This is used for OAuth callbacks to send messages back to the frontend.

---

### **2. Discord OAuth**
```env
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=https://finalnftdrop-production.up.railway.app/auth/discord/callback
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_GUILD_ID=1369232763709947914
DISCORD_INVITE_LINK=https://discord.com/invite/Xc54PrHv7w
```
⚠️ **IMPORTANT:** Update `DISCORD_REDIRECT_URI` in Discord Developer Portal:
- Go to: https://discord.com/developers/applications
- Select your app
- OAuth2 → Redirects
- Add: `https://finalnftdrop-production.up.railway.app/auth/discord/callback`

---

### **3. X (Twitter) OAuth**
```env
X_CLIENT_ID=your_x_client_id
X_CLIENT_SECRET=your_x_client_secret
X_REDIRECT_URI=https://finalnftdrop-production.up.railway.app/auth/x/callback
NEFTIT_X_USERNAME=neftitxyz
```
⚠️ **IMPORTANT:** Update `X_REDIRECT_URI` in X Developer Portal:
- Go to: https://developer.x.com/en/portal/dashboard
- Select your app
- Settings → User authentication settings
- Update Callback URL: `https://finalnftdrop-production.up.railway.app/auth/x/callback`

---

### **4. Supabase Database**
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🔐 SECURITY REMINDER

**CRITICAL:** Your `.env` file was exposed on GitHub!

You MUST regenerate these credentials:

### **Discord:**
1. Go to: https://discord.com/developers/applications
2. Select your app
3. **Bot** → Reset Token (copy new token)
4. **OAuth2** → Reset Secret (copy new secret)
5. Update Railway environment variables

### **X (Twitter):**
1. Go to: https://developer.x.com/en/portal/dashboard
2. Select your app
3. Keys and tokens → Regenerate
4. Update Railway environment variables

### **Supabase:**
1. Go to your Supabase project settings
2. API → Reset anon key (if possible)
3. Update Railway environment variables

---

## 🚀 DEPLOYMENT STEPS

### **Step 1: Verify Railway Deployment**
✅ Check that your Railway app is running
✅ Visit: https://finalnftdrop-production.up.railway.app
✅ You should see a response (not 404)

### **Step 2: Test API Endpoints**
Test these URLs in your browser:
- https://finalnftdrop-production.up.railway.app/api/config
- https://finalnftdrop-production.up.railway.app/api/participant-count

Both should return JSON responses.

### **Step 3: Update OAuth Redirect URIs**
✅ Discord Developer Portal - add Railway callback URL
✅ X Developer Portal - add Railway callback URL

### **Step 4: Deploy Frontend**
The frontend code has been updated to use Railway backend.
Just rebuild and deploy to Vercel:

```bash
npm run build
git add .
git commit -m "Connect frontend to Railway backend"
git push origin main
```

Vercel will auto-deploy.

### **Step 5: Test Everything**
1. Visit: https://www.neftit.site
2. Open browser console (F12)
3. Check for these logs:
   ```
   🚀 NFT Drop page loaded
   📊 Loading participant count...
   🔧 Config response status: 200
   ```
4. Click "Connect Discord" - should open Discord OAuth
5. Complete Discord auth - should work!
6. Click "Connect X" - should open X OAuth
7. Complete X auth - should work!

---

## 🐛 TROUBLESHOOTING

### **Issue: API calls still return 404**
**Solution:** Check Railway logs for errors
- Railway dashboard → Deployments → View logs
- Look for startup errors

### **Issue: OAuth popup shows error**
**Solution:** Check redirect URIs match exactly
- Discord: `https://finalnftdrop-production.up.railway.app/auth/discord/callback`
- X: `https://finalnftdrop-production.up.railway.app/auth/x/callback`

### **Issue: "Message from different origin"**
**Solution:** Check `BASE_URL` in Railway
- Must be: `https://www.neftit.site`
- NOT: `https://finalnftdrop-production.up.railway.app`

---

## ✅ FINAL CHECKLIST

Before going live, verify:

- [ ] Railway app is deployed and running
- [ ] All environment variables are set in Railway
- [ ] Discord redirect URI updated in Discord portal
- [ ] X redirect URI updated in X portal
- [ ] Frontend rebuilt and deployed to Vercel
- [ ] API endpoints return 200 (not 404)
- [ ] Discord OAuth works end-to-end
- [ ] X OAuth works end-to-end
- [ ] All sensitive credentials regenerated (security breach)

---

## 🎉 SUCCESS!

Once all checkboxes are complete, your site will be fully functional!

**Frontend:** https://www.neftit.site (Vercel)
**Backend:** https://finalnftdrop-production.up.railway.app (Railway)
**Database:** Supabase

All three working together! 🚀
