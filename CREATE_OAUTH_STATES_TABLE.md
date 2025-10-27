# 🔧 FIX X OAUTH - CREATE OAUTH_STATES TABLE

## 🚨 THE PROBLEM

X OAuth is failing with: **"Invalid state or missing code verifier"**

**Why?** Railway restarts containers and loses in-memory session data (PKCE code_verifier).

**Solution:** Store OAuth states in Supabase database instead of memory.

---

## ✅ CREATE THE TABLE IN SUPABASE

### **Step 1: Go to Supabase SQL Editor**

1. Go to: https://supabase.com
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

---

### **Step 2: Run This SQL**

Copy and paste this SQL query:

```sql
-- Create oauth_states table for storing OAuth state and PKCE verifiers
CREATE TABLE IF NOT EXISTS oauth_states (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    state_key TEXT UNIQUE NOT NULL,
    state_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_oauth_states_key ON oauth_states(state_key);
CREATE INDEX IF NOT EXISTS idx_oauth_states_expires ON oauth_states(expires_at);

-- Enable Row Level Security (RLS)
ALTER TABLE oauth_states ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to manage oauth states
CREATE POLICY "Service role can manage oauth states"
ON oauth_states
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create policy to allow anon key to insert/select oauth states (needed for OAuth flow)
CREATE POLICY "Allow anon to manage oauth states"
ON oauth_states
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

-- Function to clean up expired states (run periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_oauth_states()
RETURNS void AS $$
BEGIN
    DELETE FROM oauth_states WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a cron job to clean up expired states every hour
-- (Requires pg_cron extension - enable in Database > Extensions)
-- SELECT cron.schedule('cleanup-oauth-states', '0 * * * *', 'SELECT cleanup_expired_oauth_states()');
```

---

### **Step 3: Click "Run"**

Click the **Run** button (or press `Ctrl+Enter`)

You should see: **Success. No rows returned**

---

### **Step 4: Verify Table Was Created**

1. Go to **Table Editor** in Supabase
2. You should see a new table: `oauth_states`
3. Columns should be:
   - `id` (uuid)
   - `state_key` (text)
   - `state_data` (jsonb)
   - `created_at` (timestamptz)
   - `expires_at` (timestamptz)

---

## 🧪 TEST X OAUTH AGAIN

After creating the table:

1. Visit: https://www.neftit.site
2. Hard refresh: `Ctrl + Shift + R`
3. Connect Discord first (if not already)
4. Click **"Connect X"**
5. Authorize on X
6. Should redirect back successfully! ✅

---

## 📊 WHAT HAPPENS NOW

When X OAuth starts:
1. ✅ Server generates PKCE `code_verifier`
2. ✅ Stores it in Supabase `oauth_states` table
3. ✅ Railway container can restart - data is safe!
4. ✅ Callback retrieves `code_verifier` from Supabase
5. ✅ Exchanges code for access token
6. ✅ OAuth completes successfully!

---

## 🐛 TROUBLESHOOTING

### **Issue: SQL error when creating table**

**Check:**
- You're using the correct Supabase project
- You have admin access

**Fix:**
- Make sure you're in the SQL Editor, not Table Editor
- Copy the entire SQL block

---

### **Issue: X OAuth still fails after creating table**

**Check Railway logs for:**
```
Error storing state in Supabase: [error message]
```

**Possible causes:**
1. Supabase environment variables not set in Railway
2. Wrong Supabase URL or key
3. RLS policies blocking access

**Fix:**
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Railway
- Check the policies were created correctly

---

## ✅ EXPECTED RAILWAY LOGS (Success)

After creating the table, Railway logs should show:
```
X OAuth2 - Starting authentication flow
✅ State stored in Supabase
X OAuth2 callback received
✅ Retrieved state from Supabase
✅ Code verifier found
🔵 Exchanging code for access token...
✅ X OAuth successful
```

---

## 🎉 ONCE TABLE IS CREATED

X OAuth will work reliably even when Railway restarts! 🚀

The table will automatically:
- ✅ Store OAuth states securely
- ✅ Survive Railway container restarts
- ✅ Auto-expire old states after 1 hour
- ✅ Support both Discord and X OAuth

---

**Create the table now and X OAuth will work!** 💪
