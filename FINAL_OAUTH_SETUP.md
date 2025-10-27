# 🎯 FINAL OAUTH SETUP - UPDATE REDIRECT URIs

## ✅ CODE UPDATED!

Your frontend now uses: `https://api.neftit.site`

OAuth URLs will now show as:
- ✅ `api.neftit.site/auth/discord` (clean!)
- ✅ `api.neftit.site/auth/x` (clean!)

---

## ⚠️ CRITICAL: UPDATE OAUTH REDIRECT URIs

You MUST update the redirect URIs in both developer portals!

### **1. Discord Developer Portal**

1. Go to: https://discord.com/developers/applications
2. Select your application
3. Go to **OAuth2** → **Redirects**
4. **REMOVE old URL:**
   ```
   https://finalnftdrop-production.up.railway.app/auth/discord/callback
   ```
5. **ADD new URL:**
   ```
   https://api.neftit.site/auth/discord/callback
   ```
6. Click **Save Changes**

---

### **2. X (Twitter) Developer Portal**

1. Go to: https://developer.x.com/en/portal/dashboard
2. Select your application
3. Go to **Settings** → **User authentication settings** → **Edit**
4. **UPDATE Callback URI / Redirect URL:**
   ```
   https://api.neftit.site/auth/x/callback
   ```
5. Click **Save**

---

## 🔧 UPDATE RAILWAY ENVIRONMENT VARIABLES

Go to Railway → Your Project → Variables

**UPDATE these two variables:**

```env
DISCORD_REDIRECT_URI=https://api.neftit.site/auth/discord/callback
X_REDIRECT_URI=https://api.neftit.site/auth/x/callback
```

**KEEP this variable as is:**
```env
BASE_URL=https://www.neftit.site
```
⚠️ This must stay as your frontend URL!

---

## ⏰ WAIT FOR DNS & DEPLOYMENT

1. **DNS propagation:** 5-10 minutes
2. **Vercel deployment:** 2-3 minutes (auto-deploying now)
3. **Railway SSL:** 2-5 minutes (for `api.neftit.site`)

**Total wait time:** ~10-15 minutes

---

## 🧪 TEST AFTER WAITING

### **Step 1: Test API Endpoint**

Open in browser:
```
https://api.neftit.site/api/config
```

**Expected:** JSON response with Discord invite link

If you see SSL error, wait a few more minutes for Railway to provision SSL.

---

### **Step 2: Test Frontend**

1. Visit: https://www.neftit.site
2. Hard refresh: `Ctrl + Shift + R`
3. Open console (F12)
4. Look for:
   ```
   📊 Response URL: https://api.neftit.site/api/participant-count
   🔧 Config response URL: https://api.neftit.site/api/config
   ```

---

### **Step 3: Test Discord OAuth**

1. Click **"Connect Discord"**
2. Should open: `https://api.neftit.site/auth/discord` ✅
3. Authorize
4. Should redirect back successfully
5. Console should show: `🎉 Discord OAuth SUCCESS received`

---

### **Step 4: Test X OAuth**

1. After Discord connected, click **"Connect X"**
2. Should open: `https://api.neftit.site/auth/x` ✅
3. Authorize
4. Should redirect back successfully
5. Console should show: `🎉 X OAuth SUCCESS received`

---

## 🎉 SUCCESS CHECKLIST

- [ ] DNS CNAME record added in Namecheap
- [ ] Custom domain added in Railway (green checkmark)
- [ ] Discord redirect URI updated
- [ ] X redirect URI updated
- [ ] Railway environment variables updated
- [ ] Waited 10-15 minutes for DNS/SSL
- [ ] `https://api.neftit.site/api/config` returns JSON
- [ ] Frontend shows correct API URLs in console
- [ ] Discord OAuth works end-to-end
- [ ] X OAuth works end-to-end

---

## 🚀 YOUR FINAL ARCHITECTURE

```
┌─────────────────────────────────────┐
│  FRONTEND (Vercel)                  │
│  https://www.neftit.site            │
│  https://neftit.site                │
└──────────────┬──────────────────────┘
               │
               │ API Calls
               ↓
┌─────────────────────────────────────┐
│  BACKEND API (Railway)              │
│  https://api.neftit.site            │
│                                     │
│  OAuth URLs:                        │
│  - api.neftit.site/auth/discord     │
│  - api.neftit.site/auth/x           │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│  DATABASE (Supabase)                │
└─────────────────────────────────────┘
```

**Clean, professional, and fully functional!** ✨

---

## 🐛 TROUBLESHOOTING

### **Issue: SSL certificate error on api.neftit.site**
**Solution:** Wait 5-10 more minutes. Railway is provisioning SSL.

### **Issue: Still shows Railway URL in OAuth**
**Solution:** 
1. Hard refresh: `Ctrl + Shift + R`
2. Clear browser cache
3. Check `api-config.js` is loaded (Network tab)

### **Issue: redirect_uri_mismatch error**
**Solution:** 
1. Verify redirect URIs match EXACTLY in developer portals
2. No trailing slashes
3. Must be `https://` not `http://`

---

## ✅ ONCE ALL CHECKS PASS

**You're live!** 🎉

Your NFT drop site is fully functional with:
- ✅ Clean professional URLs
- ✅ Working Discord OAuth
- ✅ Working X OAuth
- ✅ Secure backend API
- ✅ Fast frontend delivery

**Congratulations!** 🚀
