<h1 align="center"> 
Yuvraj Entertainment Full stack Project
</h1>



<h2 align='center'>
<a href='https://entertainment-full-stack-project.vercel.app/' target="_blank">DEMO</a>
</h2>

<h1>Backend Repo <a href="https://github.com/yuvraj3225/backend-movie.git"></h1>

## Table of Contents

- [Introduction ](#introduction)
- [Features ](#features)
- [Tech Stack ](#tech-stack)
- [Prerequisites ](#prerequisites)
- [Installation & Run](#installation-and-run)
- [API Reference ](#api-reference)

- [Developer of this Project ](#Developer-of-this-project)

- [Contact ](#contact)
- [Acknowledgments ](#acknowledgments)


## Introduction
Entertainment is a full  designed to provide users with a seamless streaming experience. With a user-friendly interface and comprehensive features, Entertainment aims to emulate the functionalities of Entertainment, offering users the ability to explore, watch, and subscribe to their favorite movies and TV shows.


## Features
Some features of this application :
- **User Authentication: Secure user authentication system allows users to sign up, log in, and log out.
- **Browse Content: Users can explore a vast library of movies and TV shows available on the platform.
- **Watch Trailers: Enjoy high-quality trailers of movies and TV shows to get a glimpse before watching.

## Technologies Used
#- Frontend:

- **HTML5
- **CSS3
- **JavaScript (ES6+)
- **React.js
- **Redux (for state management)
- **Axios (for API requests)
- **React Router (for routing)

#- Backend
- **Node.js
- **Express.js
- **MongoDB (for database)
- **Mongoose (for MongoDB object modeling)

## Prerequisites

To run this project locally, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Installation and Run
1. Clone the repository from GitHub:
    ```
     git clone 
    ```
2. Redirect to the project folder:
    ```
     cd Entertainment
    ```
3. Install the required dependencies:
    ```
     npm install
    ```
4. Configure the application:
   - Create a `.env` file in the root directory of the project.
   - Add the following environment variables to the `.env` file:
      ```
       PORT=3000                             # The port on which the application will run
       DATABASE_URI= <your_uri_here>         # The MongoDB connection string
      ```
5. Create Database:
    - Inserting subscribers data into MongoDB.
        ```
         npm run createDB
        ```
6. Start server:
    ```
     npm start
    ```
    > [!NOTE]
    > Access the  application in your web browser at `http://localhost:3000` (base URL)


## API Reference


## Backend API Endpoints

### Authentication Endpoints

- **POST /api/auth/signup**
  - Description: Register a new user.
  - Request Body:
    - `name`: User's name
    - `email`: User's email
    - `password`: User's password
  - Response:
    - `token`: JWT token for authentication

- **POST /api/auth/login**
  - Description: Log in an existing user.
  - Request Body:
    - `email`: User's email
    - `password`: User's password
  - Response:
    - `token`: JWT token for authentication

### Movie and TV Show Endpoints

- **GET /api/movies**
  - Description: Get a list of all available movies.
  - Response: Array of movie objects

- **GET /api/tv-shows**
  - Description: Get a list of all available TV shows.
  - Response: Array of TV show objects

- **GET /api/movies/:id**
  - Description: Get details of a specific movie by ID.
  - Parameters: `id` (Movie ID)
  - Response: Movie object

- **GET /api/tv-shows/:id**
  - Description: Get details of a specific TV show by ID.
  - Parameters: `id` (TV show ID)
  - Response: TV show object

- **POST /api/movies**
  - Description: Add a new movie to the database. (Admin access required)
  - Request Body: Movie object
  - Response: Added movie object

- **POST /api/tv-shows**
  - Description: Add a new TV show to the database. (Admin access required)
  - Request Body: TV show object
  - Response: Added TV show object



## Developer of this Project
- Yuvraj Lungade [GitHub](https://github.com/yuvraj3225) | [LinkedIn](www.linkedin.com/in/yuvraj-lungade-802151241) | 



## Contact
If you have any questions or suggestions, feel free to reach out to us at [Gmail]<a href="yuvrajlungade3774@gmail.com">.

## Acknowledgment
We'd like to thank the open-source community and the creators of Node.js, Express, and MongoDB for their valuable contributions.

We would also like to thank the contributors to this project for their valuable contributions.













