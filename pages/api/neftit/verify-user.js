/**
 * NEFTIT Partner Verification API for neftit.xyz
 * 
 * INSTALLATION:
 * 1. Copy this file to: pages/api/neftit/verify-user.js (in neftit.xyz codebase)
 * 2. Add to .env.local: NEFTIT_API_KEY=neftit_secret_key_12345
 * 3. Deploy to production
 */
import { createClient } from '@supabase/supabase-js';
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed',
            registered: false
        });
    }
    try {
        // 1. Verify API Key
        const apiKey = req.headers['x-api-key'];
        console.log('🔑 Received API Key:', apiKey);
        console.log('🔑 Expected API Key:', process.env.NEFTIT_API_KEY);
        if (!apiKey || apiKey !== process.env.NEFTIT_API_KEY) {
            console.error('❌ Unauthorized: Invalid API key');
            return res.status(401).json({
                error: 'Unauthorized',
                registered: false
            });
        }
        // 2. Get wallet/email from request
        const { wallet, email } = req.body;
        console.log('📝 Verification request:', { wallet, email });
        if (!wallet && !email) {
            return res.status(400).json({
                error: 'Wallet address or email required',
                registered: false
            });
        }
        // 3. Connect to Supabase
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!supabaseUrl || !supabaseKey) {
            console.error('❌ Supabase credentials missing');
            return res.status(500).json({
                error: 'Server configuration error',
                registered: false
            });
        }
        const supabase = createClient(supabaseUrl, supabaseKey);
        // 4. Check if wallet exists in users table
        let query = supabase
            .from('users')
            .select('wallet_address, created_at')
            .limit(1);
        if (wallet) {
            // Search by wallet address (case-insensitive)
            query = query.ilike('wallet_address', wallet);
            console.log('🔍 Searching for wallet:', wallet);
        } else if (email) {
            // Search by email if wallet not provided
            query = query.ilike('email', email);
            console.log('🔍 Searching for email:', email);
        }
        const { data, error } = await query;
        if (error) {
            console.error('❌ Database error:', error);
            return res.status(500).json({
                error: 'Database error',
                registered: false,
                details: error.message
            });
        }
        // 5. Return result
        const isRegistered = data && data.length > 0;
        console.log(isRegistered ? '✅ User found in database' : '❌ User NOT found in database');
        console.log('📊 Query result:', data);
        if (isRegistered) {
            return res.status(200).json({
                registered: true,
                timestamp: data[0].created_at || new Date().toISOString()
            });
        }
        return res.status(200).json({
            registered: false,
            timestamp: null
        });
    } catch (error) {
        console.error('❌ Verification error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            registered: false,
            details: error.message
        });
    }
}
