# 🚀 NEXT STEPS - COMPLETE YOUR DEPLOYMENT

## ✅ WHAT I'VE DONE

1. ✅ Created `api-config.js` with your Railway URL
2. ✅ Updated `index.html` to load the config
3. ✅ Updated ALL API calls in `script.js` to use Railway backend
4. ✅ Updated OAuth URLs to use Railway backend
5. ✅ Updated message listeners to accept Railway origin
6. ✅ Rebuilt frontend
7. ✅ Pushed to GitHub (Vercel will auto-deploy)

---

## 🔧 WHAT YOU NEED TO DO NOW

### **STEP 1: Update OAuth Redirect URIs** ⚠️ CRITICAL

#### **Discord Developer Portal:**
1. Go to: https://discord.com/developers/applications
2. Select your application
3. Go to **OAuth2** → **Redirects**
4. Add this URL:
   ```
   https://finalnftdrop-production.up.railway.app/auth/discord/callback
   ```
5. Click **Save Changes**

#### **X Developer Portal:**
1. Go to: https://developer.x.com/en/portal/dashboard
2. Select your application
3. Go to **Settings** → **User authentication settings** → **Edit**
4. Update **Callback URI / Redirect URL**:
   ```
   https://finalnftdrop-production.up.railway.app/auth/x/callback
   ```
5. Click **Save**

---

### **STEP 2: Verify Railway Environment Variables**

Go to Railway → Your Project → Variables

Make sure you have:

```env
PORT=3001
BASE_URL=https://www.neftit.site
DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...
DISCORD_REDIRECT_URI=https://finalnftdrop-production.up.railway.app/auth/discord/callback
DISCORD_BOT_TOKEN=...
DISCORD_GUILD_ID=1369232763709947914
DISCORD_INVITE_LINK=https://discord.com/invite/Xc54PrHv7w
X_CLIENT_ID=...
X_CLIENT_SECRET=...
X_REDIRECT_URI=https://finalnftdrop-production.up.railway.app/auth/x/callback
NEFTIT_X_USERNAME=neftitxyz
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

⚠️ **CRITICAL:** `BASE_URL` must be `https://www.neftit.site` (your frontend), NOT the Railway URL!

---

### **STEP 3: Test Your Deployment**

#### **A. Test Backend API (Railway)**

Open these URLs in your browser:

1. **Config endpoint:**
   ```
   https://finalnftdrop-production.up.railway.app/api/config
   ```
   Should return JSON with Discord invite link, etc.

2. **Participant count:**
   ```
   https://finalnftdrop-production.up.railway.app/api/participant-count
   ```
   Should return JSON with count.

#### **B. Test Frontend (Vercel)**

1. Wait 2-3 minutes for Vercel to deploy
2. Visit: https://www.neftit.site
3. Open browser console (F12)
4. Look for these logs:
   ```
   🚀 NFT Drop page loaded
   📊 Response status: 200
   🔧 Config response status: 200
   ```

If you see `200` status codes, the API connection is working! ✅

#### **C. Test Discord OAuth**

1. Click **"Connect Discord"** button
2. Should open Discord OAuth popup
3. Authorize the app
4. Should redirect back and show success
5. Check console for: `🎉 Discord OAuth SUCCESS received`

#### **D. Test X OAuth**

1. After Discord is connected, click **"Connect X"**
2. Should open X OAuth popup
3. Authorize the app
4. Should redirect back and show success
5. Check console for: `🎉 X OAuth SUCCESS received`

---

## 🐛 TROUBLESHOOTING

### **Issue: Still getting 404 on API calls**

**Check:**
1. Railway app is running (check Railway dashboard)
2. `api-config.js` is loaded (check Network tab in browser)
3. Console shows the correct API_URL

**Fix:**
- Hard refresh the page: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

---

### **Issue: OAuth popup shows "redirect_uri_mismatch"**

**Check:**
1. Discord redirect URI in Discord portal matches exactly:
   ```
   https://finalnftdrop-production.up.railway.app/auth/discord/callback
   ```
2. X redirect URI in X portal matches exactly:
   ```
   https://finalnftdrop-production.up.railway.app/auth/x/callback
   ```

**Fix:**
- Update the redirect URIs in the developer portals
- Make sure there are no trailing slashes
- Make sure it's `https://` not `http://`

---

### **Issue: "Message from different origin" in console**

**Check:**
1. Railway environment variable `BASE_URL` is set to: `https://www.neftit.site`
2. NOT set to the Railway URL

**Fix:**
- Update `BASE_URL` in Railway variables
- Redeploy Railway app

---

## 📊 EXPECTED CONSOLE LOGS (Success)

When everything is working, you should see:

```
🚀 NFT Drop page loaded - SCRIPT VERSION 3
📊 Loading participant count...
📊 Response status: 200
📊 Response URL: https://finalnftdrop-production.up.railway.app/api/participant-count
✅ Participant count loaded: 123
🔧 Config response status: 200
🔧 Config response URL: https://finalnftdrop-production.up.railway.app/api/config
✅ Loaded Discord invite from server: https://discord.com/invite/Xc54PrHv7w
✅ Loaded Discord guild ID from server: 1369232763709947914
```

---

## 🎉 FINAL CHECKLIST

Before you're done, verify:

- [ ] OAuth redirect URIs updated in Discord portal
- [ ] OAuth redirect URIs updated in X portal
- [ ] Railway environment variables are correct
- [ ] `BASE_URL` in Railway is `https://www.neftit.site`
- [ ] Frontend deployed to Vercel (auto-deploy from GitHub)
- [ ] API endpoints return 200 (not 404)
- [ ] Discord OAuth works end-to-end
- [ ] X OAuth works end-to-end
- [ ] Console shows no errors

---

## 🔐 SECURITY REMINDER

Don't forget to regenerate your credentials that were exposed:
- Discord Bot Token
- Discord OAuth Secret
- X OAuth Secret
- Supabase keys (if possible)

See `SECURITY_BREACH_RESPONSE.md` for details.

---

## 📞 NEED HELP?

If something isn't working:

1. Check Railway logs for backend errors
2. Check browser console for frontend errors
3. Verify all environment variables are set
4. Verify OAuth redirect URIs match exactly
5. Try hard refresh: `Ctrl + Shift + R`

---

## ✅ YOU'RE ALMOST THERE!

Just update the OAuth redirect URIs and you'll be live! 🚀
