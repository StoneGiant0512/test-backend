const { pool } = require('../config/database');

/**
 * Get all projects from the database
 * @param {Object} filters - Optional filters (status, search)
 * @returns {Promise<Array>} Array of project objects
 */
const getAllProjects = async (filters = {}) => {
  try {
    let query = 'SELECT * FROM projects WHERE 1=1';
    const params = [];
    let paramCount = 1;

    // Filter by status if provided
    if (filters.status && filters.status !== 'all') {
      query += ` AND status = $${paramCount}`;
      params.push(filters.status);
      paramCount++;
    }

    // Search by name or assigned team member if provided
    if (filters.search) {
      query += ` AND (name ILIKE $${paramCount} OR assigned_team_member ILIKE $${paramCount})`;
      params.push(`%${filters.search}%`);
      paramCount++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

/**
 * Get a single project by ID
 * @param {number} id - Project ID
 * @returns {Promise<Object>} Project object
 */
const getProjectById = async (id) => {
  try {
    const query = 'SELECT * FROM projects WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    throw error;
  }
};

/**
 * Create a new project
 * @param {Object} projectData - Project data (name, status, deadline, assigned_team_member, budget)
 * @returns {Promise<Object>} Created project object
 */
const createProject = async (projectData) => {
  try {
    const { name, status, deadline, assigned_team_member, budget } = projectData;
    
    const query = `
      INSERT INTO projects (name, status, deadline, assigned_team_member, budget)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const values = [name, status, deadline, assigned_team_member, budget];
    const result = await pool.query(query, values);
    
    return result.rows[0];
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

/**
 * Update an existing project
 * @param {number} id - Project ID
 * @param {Object} projectData - Updated project data
 * @returns {Promise<Object>} Updated project object
 */
const updateProject = async (id, projectData) => {
  try {
    const { name, status, deadline, assigned_team_member, budget } = projectData;
    
    const query = `
      UPDATE projects
      SET name = $1,
          status = $2,
          deadline = $3,
          assigned_team_member = $4,
          budget = $5,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;
    
    const values = [name, status, deadline, assigned_team_member, budget, id];
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

/**
 * Delete a project by ID
 * @param {number} id - Project ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
const deleteProject = async (id) => {
  try {
    const query = 'DELETE FROM projects WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};

