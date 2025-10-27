# 🔒 SUPABASE SECURITY SETUP - URGENT

## ⚠️ IMMEDIATE ACTION REQUIRED

Since Supabase doesn't allow easy key regeneration, you MUST enable Row Level Security (RLS) to protect your data.

---

## 🛡️ STEP 1: Enable RLS on All Tables

### Go to Supabase Dashboard:
1. https://supabase.com/dashboard
2. Select your project
3. Click **"Table Editor"** (left sidebar)

### For EACH table (`participants`, `oauth_states`):

1. Click on the table name
2. Click **"..." menu** (top right)
3. Click **"Edit table"**
4. **Enable RLS** toggle (turn it ON)
5. Click **"Save"**

---

## 🔐 STEP 2: Create RLS Policies

### For `participants` table:

1. Go to **"Authentication"** → **"Policies"** (left sidebar)
2. Find `participants` table
3. Click **"New Policy"**
4. Click **"Create policy from scratch"**

#### Policy 1: Allow Backend to Read/Write
```sql
-- Policy Name: Backend full access
-- Allowed operation: ALL
-- Policy definition:
true
```

**OR** if you want more security:

#### Policy 2: Allow Only Service Role
```sql
-- Policy Name: Service role only
-- Allowed operation: ALL
-- Policy definition:
auth.role() = 'service_role'
```

### For `oauth_states` table:

1. Same steps as above
2. Create policy with `auth.role() = 'service_role'`

---

## 🚨 STEP 3: Verify RLS is Working

### Test in SQL Editor:

1. Go to **"SQL Editor"** (left sidebar)
2. Run this query:

```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

**Expected output:**
- `participants` → `rowsecurity: true`
- `oauth_states` → `rowsecurity: true`

---

## 🔄 STEP 4: Update Your Backend Code

Make sure your backend uses `SUPABASE_SERVICE_KEY` (not `SUPABASE_KEY`):

### In `server.js`, verify:

```javascript
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY  // ✅ Use service key, not anon key
);
```

---

## 📋 STEP 5: Check Railway Environment Variables

1. Go to Railway dashboard
2. Select your project
3. Go to **Variables**
4. Verify these are set:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key (not used by backend, but keep it)
SUPABASE_SERVICE_KEY=your_service_role_key (THIS is what backend uses)
```

---

## ✅ VERIFICATION CHECKLIST

- [ ] RLS enabled on `participants` table
- [ ] RLS enabled on `oauth_states` table
- [ ] RLS policies created for both tables
- [ ] Backend uses `SUPABASE_SERVICE_KEY`
- [ ] Railway environment variables are correct
- [ ] Test Discord OAuth (should still work)
- [ ] Test X OAuth (should still work)
- [ ] Check participant count loads

---

## 🆘 IF YOU NEED TO CREATE NEW PROJECT (Last Resort)

### Only do this if data is compromised:

1. **Create new Supabase project:**
   - Go to https://supabase.com/dashboard
   - Click **"New project"**
   - Name it (e.g., "neftit-nft-drop-secure")
   - Wait for setup (2-3 minutes)

2. **Copy database schema:**
   - Old project → SQL Editor → Export schema
   - New project → SQL Editor → Import schema

3. **Run table creation SQL:**
   ```sql
   -- Copy from CREATE_OAUTH_STATES_TABLE.md
   -- Run in new project
   ```

4. **Update Railway variables:**
   - New `SUPABASE_URL`
   - New `SUPABASE_SERVICE_KEY`

5. **Test everything**

---

## 📞 SUPPORT

If you need help:
- Supabase Discord: https://discord.supabase.com
- Supabase Docs: https://supabase.com/docs/guides/auth/row-level-security

---

**PRIORITY: Enable RLS NOW to secure your existing data!**
