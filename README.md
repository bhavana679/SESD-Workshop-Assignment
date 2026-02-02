# Student Management System - Backend

This is a simple student management system I built using Node.js, Express, and MongoDB. It uses TypeScript to keep things organized and error-free. The project is split into different layers like routes, controllers, and services to keep the code easy to read and maintain.

## What it can do
- Register and Login (uses JWT for security)
- Add new students
- View all students with search and filters
- Update student details
- Delete students
- Easy error messages and input validation

## The setup

### 1. Get the code
First, clone this repository and go into the folder:
```bash
git clone https://github.com/bhavana679/SESD-Workshop-Assignment.git
cd SESD-Workshop-Assignment
```

### 2. Install everything
Run this command to install all the needed packages:
```bash
npm install
```

### 3. Set up your settings
Create a file named `.env` in the main folder and paste this inside. You can change the values if needed:
```env
MONGODB_URI=mongodb://localhost:27017/sesd-workshop
NODE_ENV=development
JWT_SECRET=your_secret_key
PORT=5001
```

### 4. Run it
To start the server in development mode, use:
```bash
npm run dev
```

If you want to run it for production, use:
```bash
npm start
```

## API Routes

### Auth
- POST `/api/auth/register` - Create a new account
- POST `/api/auth/login` - Login to get your token

### Students (You need to be logged in)
- POST `/api/students` - Add a student
- GET `/api/students` - See everyone (you can use ?search=name)
- GET `/api/students/:id` - See one student's details
- PUT `/api/students/:id` - Change student info
- DELETE `/api/students/:id` - Remove a student

## How to test it
I usually use Thunder Client in VS Code to test these routes. Just remember to get your token from the login route first, then add it to the 'Auth' tab as a 'Bearer Token' for all the student routes.

## My code structure
- **src/routes**: Where I define the URLs
- **src/controllers**: Where I handle the requests and responses
- **src/services**: Where the main logic lives
- **src/repositories**: Where I talk to the database
- **src/models**: Where I define what a student looks like
- **src/middlewares**: For checking tokens and validating data
