# Project Dashboard Backend API

Backend API for the Mini SaaS Dashboard project management system.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client for Node.js
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection and configuration
├── controllers/
│   ├── projectController.js # Business logic and request handling
│   └── authController.js   # Authentication business logic
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── routes/
│   ├── projectRoutes.js     # API route definitions
│   └── authRoutes.js        # Authentication route definitions
├── services/
│   ├── projectService.js    # Database operations
│   └── authService.js       # Authentication database operations
├── seeders/
│   └── seedProjects.js      # Database seeding script
├── server.js                 # Express server entry point
└── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` or `.env.local` file in the backend directory:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=project_dashboard
DB_USER=postgres
DB_PASSWORD=your_password_here

# SSL/TLS Configuration (required for cloud databases like AWS RDS, Heroku, etc.)
DB_SSL=false                    # Set to 'true' to enable SSL
DB_SSL_REJECT_UNAUTHORIZED=false # Set to 'false' for development, 'true' for production with proper certificates

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (change this to a strong random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
```

**Note:** For cloud-hosted databases (AWS RDS, Heroku Postgres, etc.), set `DB_SSL=true` to enable SSL/TLS connections.

3. Create the PostgreSQL database:
```sql
CREATE DATABASE project_dashboard;
```

4. Run the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

### Database Seeding

To populate the database with dummy data:

```bash
npm run seed
```

This will:
- Create the projects table if it doesn't exist
- Clear existing data
- Insert 15 sample projects with various statuses

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User (Protected)
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

## Project Endpoints

### Base URL
```
http://localhost:5000/api/projects
```

### Get All Projects
```http
GET /api/projects
```

**Query Parameters:**
- `status` (optional): Filter by status (`active`, `on hold`, `completed`)
- `search` (optional): Search by project name or assigned team member

**Example:**
```http
GET /api/projects?status=active&search=Mobile
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Mobile App Development",
      "status": "active",
      "deadline": "2024-04-20",
      "assigned_team_member": "Michael Chen",
      "budget": "75000.00",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Get Single Project
```http
GET /api/projects/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "E-Commerce Platform Redesign",
    "status": "active",
    "deadline": "2024-03-15",
    "assigned_team_member": "Sarah Johnson",
    "budget": "50000.00",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### Create Project
```http
POST /api/projects
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Project",
  "status": "active",
  "deadline": "2024-05-01",
  "assigned_team_member": "John Doe",
  "budget": 30000.00
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "id": 16,
    "name": "New Project",
    "status": "active",
    "deadline": "2024-05-01",
    "assigned_team_member": "John Doe",
    "budget": "30000.00",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### Update Project
```http
PUT /api/projects/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Project Name",
  "status": "on hold",
  "deadline": "2024-06-01",
  "assigned_team_member": "Jane Smith",
  "budget": 35000.00
}
```

### Delete Project
```http
DELETE /api/projects/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes:

1. Register or login to get a JWT token
2. Include the token in the Authorization header: `Authorization: Bearer <token>`
3. Tokens expire after 7 days

### Password Requirements
- Minimum 6 characters
- Stored as bcrypt hash (never in plain text)

### Token Format
Tokens are sent in the Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Project Model

Each project has the following fields:

- `id` (Integer, Primary Key, Auto-increment)
- `name` (String, Required)
- `status` (String, Required) - Must be one of: `active`, `on hold`, `completed`
- `deadline` (Date, Required)
- `assigned_team_member` (String, Required)
- `budget` (Decimal, Required)
- `created_at` (Timestamp, Auto-generated)
- `updated_at` (Timestamp, Auto-updated)

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (development only)"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Scripts

- `npm start` - Start the server
- `npm run dev` - Start the server with nodemon (auto-reload)
- `npm run seed` - Seed the database with dummy data

## License

ISC

