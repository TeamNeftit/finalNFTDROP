/**
 * NEFTIT Partner Verification API
 * This endpoint verifies if a wallet address exists in the database
 * 
 * HOW TO USE:
 * 1. Save this file as: pages/api/neftit/verify-user.js
 * 2. That's it! The endpoint will be available at: https://your-domain.com/api/neftit/verify-user
 */
import { createClient } from '@supabase/supabase-js';
export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed', registered: false });
    }
    try {
        // 1. Check API Key for security (optional but recommended)
        const apiKey = req.headers['x-api-key'];
        if (apiKey !== process.env.NEFTIT_API_KEY) {
            return res.status(401).json({ error: 'Unauthorized', registered: false });
        }
        // 2. Get wallet address from request
        const { wallet, email } = req.body;
        if (!wallet && !email) {
            return res.status(400).json({
                error: 'Wallet address or email required',
                registered: false
            });
        }
        // 3. Connect to Supabase
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );
        // 4. Check if wallet exists in database
        let query = supabase
            .from('users')
            .select('wallet_address, created_at')
            .limit(1);
        if (wallet) {
            // Search by wallet address (case-insensitive)
            query = query.ilike('wallet_address', wallet);
        } else if (email) {
            // Search by email if wallet not provided
            query = query.ilike('email', email);
        }
        const { data, error } = await query;
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                error: 'Database error',
                registered: false
            });
        }
        // 5. Return result
        if (data && data.length > 0) {
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
        console.error('Verification error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            registered: false
        });
    }
}
