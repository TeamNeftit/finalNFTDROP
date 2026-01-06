const express = require('express');
const router = express.Router();
/**
 * NEFTIT Partner Verification Endpoint
 * Checks if wallet/email exists in database
 */
router.post('/api/neftit/verify-user', async (req, res) => {
  try {
    // 1. Validate API Key (security)
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.NEFTIT_API_KEY) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        registered: false 
      });
    }
    // 2. Get wallet/email from request
    const { wallet, email } = req.body;
    if (!wallet && !email) {
      return res.status(400).json({ 
        error: 'Wallet or email required',
        registered: false 
      });
    }
    // 3. Query your database
    // IMPORTANT: Adjust table/column names to match YOUR database
    const db = require('../config/database'); // Your DB connection
    
    let query, params;
    
    if (wallet) {
      // Check by wallet (case-insensitive)
      query = 'SELECT id, created_at FROM users WHERE LOWER(wallet_address) = LOWER($1) LIMIT 1';
      params = [wallet];
    } else {
      // Check by email (case-insensitive)
      query = 'SELECT id, created_at FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1';
      params = [email];
    }
    const result = await db.query(query, params);
    // 4. Return response
    if (result.rows && result.rows.length > 0) {
      return res.json({
        registered: true,
        timestamp: result.rows[0].created_at || new Date().toISOString()
      });
    }
    return res.json({
      registered: false,
      timestamp: null
    });
  } catch (error) {
    console.error('NEFTIT verification error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      registered: false 
    });
  }
});
module.exports = router;
