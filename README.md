# Guessing-Game

A full-stack web application guessing game where players guess a hidden number between 1 and 10.

## Game Rules

1. System generates a hidden number between 1-10
2. User can guesses until correct
3. User can request for the answer

## User Interface

- **Register Page**

- **Login Page**

- **Guessing Game Page**

- **Account Action Component**

- **Change Username Page**

## Tech Stack

**Backend**:

- **Framework**: Go (Gin)
- **ORM**: GORM
- **Database**: PostgreSQL
- **Authentication**: JWT Tokens

**Frontend**:

- **Framework**: React.js
- **State Management**: React Context API
- **Styling**: CSS Modules
- **Routing**: React Router

## Installation Guide

### Backend Setup

1. Navigate to backend directory:

   ```bash
   cd backend/
   ```

2. Configure environment variables:

   ```bash
   cp sample.env .env
   ```

   > Edit `.env` with your actual credentials:
   >
   > - Replace `your_secret_key` with a strong JWT secret
   > - Update database credentials (username/password)

3. Install dependencies:

   ```bash
   go mod download
   ```

4. Run the server:
   ```bash
   go run cmd/main.go
   ```

### Frontend Setup

1. Navigate to frontend directory:

   ```bash
   cd frontend/
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```

## API Endpoints

| Endpoint                | Method | Description         | Request                                  | Response                             |
| ----------------------- | ------ | ------------------- | ---------------------------------------- | ------------------------------------ |
| `/register`             | POST   | Register new user   | `username` (string), `password` (string) | Returns JSON with `userId` (integer) |
| `/login`                | POST   | Authenticate user   | `username` (string), `password` (string) | Returns JSON with `token` (string)   |
| `/guess`                | POST   | Submit number guess | `guess` (integer)                        | Returns success/error message        |
| `/guess/answer`         | GET    | Get correct answer  | -                                        | Returns JSON with `answer` (integer) |
| `/user/profile`         | GET    | Get user data       | -                                        | Returns JSON with user profile data  |
| `/user/update-username` | PUT    | Change username     | `newUsername` (string)                   | Returns success/error message        |
| `/user/delete`          | DELETE | Delete account      | -                                        | Returns success/error message        |
