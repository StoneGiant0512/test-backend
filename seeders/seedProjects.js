require('dotenv').config();
const { pool } = require('../config/database');
const { createProjectsTable } = require('../setup/setup');

// Dummy project data
const dummyProjects = [
  {
    name: 'E-Commerce Platform Redesign',
    status: 'active',
    deadline: '2025-03-15',
    assigned_team_member: 'Sarah Johnson',
    budget: 50000.00,
  },
  {
    name: 'Mobile App Development',
    status: 'active',
    deadline: '2025-04-20',
    assigned_team_member: 'Michael Chen',
    budget: 75000.00,
  },
  {
    name: 'Cloud Migration Project',
    status: 'on hold',
    deadline: '2025-05-10',
    assigned_team_member: 'Emily Rodriguez',
    budget: 120000.00,
  },
  {
    name: 'Customer Portal Enhancement',
    status: 'active',
    deadline: '2025-03-30',
    assigned_team_member: 'David Kim',
    budget: 35000.00,
  },
  {
    name: 'Data Analytics Dashboard',
    status: 'completed',
    deadline: '2025-02-28',
    assigned_team_member: 'Lisa Anderson',
    budget: 45000.00,
  },
  {
    name: 'API Integration Project',
    status: 'active',
    deadline: '2025-04-05',
    assigned_team_member: 'James Wilson',
    budget: 28000.00,
  },
  {
    name: 'Security Audit & Compliance',
    status: 'on hold',
    deadline: '2025-06-15',
    assigned_team_member: 'Robert Taylor',
    budget: 65000.00,
  },
  {
    name: 'Website Performance Optimization',
    status: 'active',
    deadline: '2025-03-25',
    assigned_team_member: 'Jennifer Martinez',
    budget: 22000.00,
  },
  {
    name: 'Payment Gateway Integration',
    status: 'completed',
    deadline: '2025-02-15',
    assigned_team_member: 'Christopher Brown',
    budget: 38000.00,
  },
  {
    name: 'User Authentication System',
    status: 'active',
    deadline: '2025-04-12',
    assigned_team_member: 'Amanda White',
    budget: 32000.00,
  },
  {
    name: 'Database Optimization',
    status: 'on hold',
    deadline: '2025-05-30',
    assigned_team_member: 'Daniel Lee',
    budget: 55000.00,
  },
  {
    name: 'Content Management System',
    status: 'active',
    deadline: '2025-04-18',
    assigned_team_member: 'Jessica Garcia',
    budget: 42000.00,
  },
  {
    name: 'Automated Testing Suite',
    status: 'completed',
    deadline: '2025-02-20',
    assigned_team_member: 'Matthew Harris',
    budget: 29000.00,
  },
  {
    name: 'Email Marketing Platform',
    status: 'active',
    deadline: '2025-03-28',
    assigned_team_member: 'Nicole Thompson',
    budget: 36000.00,
  },
  {
    name: 'Inventory Management System',
    status: 'on hold',
    deadline: '2025-06-01',
    assigned_team_member: 'Kevin Moore',
    budget: 68000.00,
  },
];

/**
 * Seed the database with dummy project data
 */
const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Create table if it doesn't exist
    await createProjectsTable();

    // Clear existing data (optional - comment out if you want to keep existing data)
    await pool.query('TRUNCATE TABLE projects RESTART IDENTITY CASCADE');
    console.log('Cleared existing projects data');

    // Insert dummy projects
    const insertQuery = `
      INSERT INTO projects (name, status, deadline, assigned_team_member, budget)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    let insertedCount = 0;
    for (const project of dummyProjects) {
      await pool.query(insertQuery, [
        project.name,
        project.status,
        project.deadline,
        project.assigned_team_member,
        project.budget,
      ]);
      insertedCount++;
    }

    console.log(`Successfully seeded ${insertedCount} projects into the database`);

    // Display summary
    const statusCount = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM projects
      GROUP BY status
      ORDER BY status
    `);

    console.log('\nProjects by status:');
    statusCount.rows.forEach((row) => {
      console.log(`  ${row.status}: ${row.count}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();

