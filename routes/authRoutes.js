const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 * @body    { email, password, name }
 */
router.post('/register', authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and get JWT token
 * @access  Public
 * @body    { email, password }
 */
router.post('/login', authController.login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated user
 * @access  Private (requires JWT token)
 */
router.get('/me', authenticateToken, authController.getCurrentUser);

module.exports = router;

