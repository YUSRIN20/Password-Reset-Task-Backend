# Backend Password Reset Application

This project is a backend implementation for a password reset feature using Node.js and Nodemailer. It utilizes Express.js for server-side routing, MongoDB for database management, and bcrypt for password hashing. Below is a detailed README for this backend implementation.

---

### Project Overview

This project implements a backend system to facilitate password reset functionality for users. It includes the following features:

- User registration and login
- Password hashing for secure storage
- Password reset via email with a unique reset link
- Updating passwords securely

### Technologies Used

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express.js**: A web application framework for Node.js, providing a robust set of features for building web and mobile applications.
- **MongoDB**: A NoSQL database used for storing user data.
- **bcrypt**: A library for hashing passwords securely.
- **Nodemailer**: An email sending library for Node.js.
- **dotenv**: A module to load environment variables from a `.env` file.

### Installation

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:

    ```bash
    cd <project_directory>
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add the following variables:

    ```plaintext
    PORT=<port_number>
    MONGODBCONNECTIONSTRING=<mongoDB_connection_string>
    Reset_Link=https://password-reset-demo.netlify.app/resetpassword
    ```

5. Run the server:

    ```bash
    npm start
    ```

### Usage

- **Register a User**: Send a POST request to `/api/user/register` with username, email, and password in the request body.

- **Login**: Send a POST request to `/api/user/login` with email and password in the request body.

- **Forgot Password**: Send a POST request to `/api/user/forgotpassword` with the user's email to receive a password reset link via email.

- **Reset Password**: Access the provided reset link via email and provide a new password and confirm it.


### Frontend Integration

Integrate this backend with the frontend hosted on Netlify. The frontend repository can be found [here](https://github.com/YUSRIN20/Password-Reset-Task-FrontEnd.git), and the live demo is hosted on [Netlify](https://password-reset-demo.netlify.app/).


### Deployment

The backend is deployed on [Render](https://password-reset-task-backend.onrender.com/).

---