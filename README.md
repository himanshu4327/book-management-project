# Project - book-management-api

This repository contains the backend code for an application built using Node.js and Express.js. It provides RESTful APIs for various functionalities related to creating users, logging in users, creating books, and managing book data. The application uses MongoDB as its database and includes features like JWT token authentication and Swagger documentation.

## Introduction

This is the documentation for the book-management-api, a RESTful API that provides functionality for user registration, login, and book management.

### User API

#### Register User
- **Endpoint**: `POST /api/user/register`
- **Description**: Register a new user.
- **Request Body**:
  - `email`: User's email address.
  - `password`: User's password.
- **Response**:
  - Status 201: User successfully registered.
  - Status 400: Bad Request if the request is missing required fields.

#### User Login
- **Endpoint**: `POST /api/user/login`
- **Description**: Log in with an existing user account.
- **Request Body**:
  - `email`: User's email address.
  - `password`: User's password.
- **Response**:
  - Status 200: User successfully logged in, and a JWT token is provided.
  - Status 401: Unauthorized if the login credentials are invalid.


### Book API

#### Create Book
- **Endpoint**: `POST /api/book/create-book`
- **Description**: Create a new book entry.
- **Authentication**: Requires a valid JWT token.
- **Request Body**:
  - `title`: Title of the book.
  - `author`: Author of the book.
  - `summary`: Summary or description of the book.
- **Response**:
  - Status 201: Book created successfully.
  - Status 400: Bad Request if the request is missing required fields.
  - Status 409: Conflict if a book with the same title already exists.

#### Get All Books
- **Endpoint**: `GET /api/book/get-books`
- **Description**: Get a list of all books.
- **Authentication**: Requires a valid JWT token.
- **Response**:
  - Status 200: Successfully fetched a list of books.

#### Get Specific Book by ID
- **Endpoint**: `GET /api/book/get-book/by/:book_id`
- **Description**: Get a specific book by its ID.
- **Authentication**: Requires a valid JWT token.
- **Response**:
  - Status 200: Successfully fetched the book.
  - Status 404: Not Found if the book with the provided ID does not exist.

#### Update Book by ID
- **Endpoint**: `PUT /api/book/update-book/by/:book_id`
- **Description**: Update an existing book's information.
- **Authentication**: Requires a valid JWT token.
- **Request Body**: JSON data with the fields to be updated.
- **Response**:
  - Status 200: Book updated successfully.
  - Status 404: Not Found if the book with the provided ID does not exist.
  - Status 400: Bad Request if the request is missing required fields.
  - Status 409: Conflict if a book with the same title already exists.

#### Delete Book by ID
- **Endpoint**: `DELETE /api/book/delete-book/by/:book_id`
- **Description**: Delete a book by its ID.
- **Authentication**: Requires a valid JWT token.
- **Response**:
  - Status 200: Book deleted successfully.
  - Status 404: Not Found if the book with the provided ID does not exist.

## Authentication

Most of the book API endpoints require a valid JWT token in the Authorization header. Users need to log in to obtain a token for authenticated requests.

## Prerequisites

Before running the application, make sure you have the following software installed on your machine:

- Node.js (>=14.x.x)
- MongoDB Compass
- A code editor (preferably Visual Studio Code)

## Installation

### 1. Clone this repository to your local machine:

- Open any terminal on your local machine (e.g., bash)

```bash
$ git clone <repository_url>
$ cd book-management-project
$ npm install
```

### 2. Application Configuration

The application uses environment variables for configuration. To set up the necessary variables, follow these steps:

**Step 1: Create a `.env` file**

Create a file named `.env` in the root directory of your project. This file will store all the required environment variables with their corresponding values.

**Step 2: Set the environment variables**

Open the `.env` file in a text editor and add the following lines:

- `PORT=<port_number>`
- `MONGO_URI=<MongoDb_connection_string_for_the_database_connection>`
- `TOKEN_KEY=<your_token_key>`

Replace `<port_number>`, `<MONGO_URI>`, and `<TOKEN_KEY>` with the appropriate values for your setup. Also, make sure to fill in the other variables according to your application's requirements.

*Environment Variables:*

The following environment variables need to be set for the application to function correctly:

- `PORT`: The port number on which the server will run.
- `MONGO_URI`: MongoDB connection string for the database connection.
- `TOKEN_KEY`: Your token key for authentication purposes.

Make sure to replace the placeholders with the actual values you used in the `.env` file. Remember to keep the `.env` file secure and never commit it to version control systems to protect sensitive information.

**Step 3: Use the application**

To start the application, run the following command in your terminal or command prompt:

```bash
$ npm start
```

If you have nodemon installed and want to use it for development purposes to automatically restart the server whenever changes are made to the code, you can use the following command:

```

bash
nodemon
```

Ensure that you are in the root directory of the project when running these commands. Also, make sure you have Node.js and npm (Node Package Manager) installed on your system before executing the commands.

**Step 4: API Documentation**

The API documentation is generated using Swagger and can be accessed through the following URL when the server is running:

http://localhost:<port_number>/api-doc

To access the documentation, simply open the provided URL in your web browser while the server is running. Make sure to replace <port_number> with the actual port number on which the server is running. The API documentation provides detailed information about the available endpoints, request and response schemas, and other useful details for interacting with the API.

### Database Connection

The application establishes a database connection and performs a test query every 90 seconds to ensure the connection is active.

### Error Handling

Any errors that occur during the execution of API requests will be handled and returned as JSON responses with appropriate error messages.
```

### Assumptions 
1. - User can only have one role user at a time.
2. - All users are created as admin initially.
3. - users is only able to perform book operation  when they login with their email and password.
4. - i have make a user model for registration of user.
5. - if any title of book is used then user can not able to create book with same title.
6. - Book creation is done by logged in user.



