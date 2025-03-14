# User Management Application

A full-stack application built with React.js, Node.js, and PostgreSQL that allows users to add and display usernames.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup

1. Clone the repository
2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd client
   npm install
   ```

4. Create a PostgreSQL database named `usernames_db`

5. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the database credentials in `.env` if needed

## Running the Application

1. Start the backend server:

   ```bash
   npm run dev
   ```

2. In a new terminal, start the frontend development server:

   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Features

- Add new users
- Display list of users with timestamps
- Real-time updates
- Responsive design
- Error handling

## Technologies Used

- Frontend:

  - React.js
  - Axios for API calls
  - CSS3 for styling

- Backend:
  - Node.js
  - Express.js
  - PostgreSQL
  - pg (PostgreSQL client for Node.js)
