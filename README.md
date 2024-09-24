# MERN Simple Authentification System

## Overview

This project is a full-stack user authentication system built with React for the frontend and Express.js for the backend. It provides functionality for user signup, login, and secure session management using JSON Web Tokens (JWT).

## Backend Structure

### Server Setup (`server.js`)

- Creates an HTTP server using Express.
- Configures the server to listen on a specified port (default: 3000).

### App Configuration (`app.js`)

- Sets up the Express application with necessary middleware:
  - CORS for cross-origin requests
  - JSON and URL-encoded body parsing
  - Helmet for security headers
  - MongoDB sanitization to prevent injection
  - Custom error handling
- Connects to MongoDB using Mongoose
- Sets up application routes

### User Model (`User.js`)

- Defines the MongoDB schema for users with fields:
  - email (unique)
  - password (hashed)
  - verificationCode

### JWT Management (`jwt.js`)

- Provides functions for JWT token signing and verification
- Uses environment variables for JWT secret and expiration time

### Authentication Routes

- Signup: Handles user registration, password hashing, and sends a verification email
- Login: Authenticates users and issues JWT tokens

## Frontend Structure

### Signup Component (`Signup.js`)

- Renders a form for user registration
- Sends signup data to the backend
- Displays success or error messages

### Login Component (`Login.js`)

- Renders a form for user login
- Handles authentication with email, password, and verification code
- Stores JWT token in cookies upon successful login
- Redirects to home page after successful login

## Key Features

1. Secure password hashing using bcrypt
2. JWT-based authentication
3. Email verification system for new signups
4. MongoDB for data persistence
5. React hooks for state management in frontend components
6. Axios for HTTP requests from frontend to backend
7. Express middleware for request processing and error handling
8. Environment variable management for sensitive information

## Security Measures

- Password hashing
- JWT for stateless authentication
- CORS configuration
- Helmet for HTTP headers security
- MongoDB sanitization
- Secure cookie settings

## Setup and Running

1. Clone the repository
2. Install dependencies for both frontend and backend
3. Set up environment variables (MongoDB URI, JWT secret, etc.)
4. Run the backend server
5. Run the React frontend application

## API Endpoints

- POST `/auth/signup`: User registration
- POST `/auth/login`: User login and token issuance
