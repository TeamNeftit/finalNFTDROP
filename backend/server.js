const express = require('express');
const app = express();
// Existing middleware
app.use(express.json());
app.use(cors());
// Existing routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
// ADD THIS LINE
app.use('/', neftitRoutes);
// Start server
app.listen(3000, () => console.log('Server running'));
