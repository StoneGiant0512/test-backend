const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Import route modules
const authRoutes = require('./authRoutes');
const projectRoutes = require('./projectRoutes');

/**
 * Public routes - No authentication required
 */
router.use('/auth', authRoutes);

/**
 * Protected routes - Authentication required
 * All project routes require JWT token
 */
router.use('/projects', authenticateToken, projectRoutes);

module.exports = router;

