# User Authentication API

This API provides endpoints for user authentication and organisation management, built with Express.js. It uses JWT (JSON Web Tokens) for secure authentication.

## Table of Contents

- [User Authentication API](#user-authentication-api)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Routes](#routes)
  - [Authentication](#authentication)
  - [Organisation](#organisation)
  - [User](#user)
  - [Contributing](#contributing)

## Prerequisites

- Node.js
- npm
- Postgres (or any other database you are using)
- Express.js
- JWT

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/trevorjob/user-authentication-api.git

   ```

2. Navigate to the project directory:
   ```bash
   cd authentication-api
   ```
3. Install dependencies:

   ```bash
   npm install

   ```

4. Set up environment variables. Create a .env file in the root directory and add the following:
   ```bash
   JWT_SECRET=<your_jwt_secret>
   DB_ADDR=<your_db_uri>
   ```

## Usage

- Start the server:
  ```bash
  npm run start
  ```

* The API will be accessible at http://localhost:3000.

# Routes

## Authentication

- **Register a new user**
  - URL: `/auth/register`
  - Method: POST
  - Body:
    ```bash
    {
        "firstName": "example",
        "lastName": "example"
        "phone": "009987866"
        "password": "example"
        "email": "example@gmail.com"
    }
    ```
  - Response:
    - **201 Created: User registered successfully**
    - **400 Bad Request: Invalid input**
- **Login a user**
  - URL: `/auth/login`
  - Method: POST
  - Body:
    ```bash
    {
        "email": "exampleEmail",
        "password": "examplePassword"
    }
    ```
  - Response:
    - **200 OK: Successful login, returns JWT token**
    - **401 Unauthorized: Invalid credentials**

## Organisation

- **Get all organisations**
  - URL: `/organisations`
  - Method: GET
  - Headers:
    ```bash
    Authorization: Bearer <JWT_TOKEN>
    ```
  - Response:
    - **200 OK: Returns a list of organisations**
    - **401 Unauthorized: Invalid or missing token**
- **Get an organisation by ID**
  - URL: `organisations/<orgId>`
  - Method: GET
  - Headers:
    ```bash
    Authorization: Bearer <JWT_TOKEN>
    ```
  - Response:
    - **200 OK: Returns organisation details**
    - **401 Unauthorized: Invalid or missing token**
    - **404 Not Found: Organisation not found**
- **Create a new organisation**
  - URL: `/organisations`
  - Method: POST
  - Headers:
    ```bash
    Authorization: Bearer <JWT_TOKEN>

    ```
  - Body:
    ```bash
    {
        "name": "Example Organisation",
        "description": " example description"
    }
    ```
  - Response:
    - **201 Created: Organisation created successfully**
    - **401 Unauthorized: Invalid or missing token**

## User

- **Get a user by ID**

  - URL: `users/<id>`
  - Method: GET
  - Headers:
    ```bash
    Authorization: Bearer <JWT_TOKEN>
    ```
  - Response:
    - **200 OK: Returns user details**
    - **401 Unauthorized: Invalid or missing token**
    - **404 Not Found: User not found**

- **Add a user to an organisation**
  - URL: `/:orgId/users`
  - Method: POST
  - Headers:
    ```bash
    Authorization: Bearer <JWT_TOKEN>
    ```
  - Body:
    ```bash
    {
        "userId": "exampleUserId"
    }
    ```
  - Response:
    - **200 OK: User added to organisation successfully**
    - **401 Unauthorized: Invalid or missing token**

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

**License
This project is licensed under the MIT License.**
