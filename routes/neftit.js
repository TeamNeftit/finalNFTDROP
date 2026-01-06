// In your partner project's backend
// File: routes/neftit.js (create new file)

const express = require('express');
const router = express.Router();

// Your existing database connection
const db = require('../config/database'); // or wherever your DB is

/**
 * NEFTIT Verification Endpoint
 * Checks if a wallet address exists in the database
 */
router.post('/api/neftit/verify-user', async (req, res) => {
  try {
    const { wallet, email } = req.body;

    // Validate API key (optional security)
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.NEFTIT_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Query your database (adjust table/column names to match yours)
    let user;
    
    if (wallet) {
      // Check by wallet address (case-insensitive)
      user = await db.query(
        'SELECT * FROM users WHERE LOWER(wallet_address) = LOWER($1) LIMIT 1',
        [wallet]
      );
    } else if (email) {
      // Check by email (case-insensitive)
      user = await db.query(
        'SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1',
        [email]
      );
    } else {
      return res.status(400).json({ error: 'Wallet or email required' });
    }

    // Return result
    if (user && user.rows && user.rows.length > 0) {
      return res.json({
        registered: true,
        timestamp: user.rows[0].created_at || new Date().toISOString()
      });
    }

    return res.json({
      registered: false,
      timestamp: null
    });

  } catch (error) {
    console.error('NEFTIT verification error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
