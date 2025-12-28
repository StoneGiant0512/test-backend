const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Note: Authentication middleware is applied in routes/index.js

/**
 * @route   GET /api/projects
 * @desc    Get all projects with optional filtering (status, search)
 * @access  Private (requires JWT token)
 * @query   status - Filter by status (active, on hold, completed)
 * @query   search - Search by name or assigned team member
 */
router.get('/', projectController.getAllProjects);

/**
 * @route   GET /api/projects/:id
 * @desc    Get a single project by ID
 * @access  Private (requires JWT token)
 */
router.get('/:id', projectController.getProjectById);

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private (requires JWT token)
 * @body    { name, status, deadline, assigned_team_member, budget }
 */
router.post('/', projectController.createProject);

/**
 * @route   PUT /api/projects/:id
 * @desc    Update an existing project
 * @access  Private (requires JWT token)
 * @body    { name, status, deadline, assigned_team_member, budget }
 */
router.put('/:id', projectController.updateProject);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project
 * @access  Private (requires JWT token)
 */
router.delete('/:id', projectController.deleteProject);

module.exports = router;

