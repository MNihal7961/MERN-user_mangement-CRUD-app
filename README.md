# MERN User Management CRUD App

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-4285F4?style=for-the-badge&logo=cloudinary&logoColor=white)

This is a CRUD (Create, Read, Update, Delete) application built using MongoDB, React, Vite, Tailwind CSS, Node.js, Express, and integrated with Cloudinary for profile image uploading.

## Features

### User Side
- **Login with Email and Password** 🔒: Users can log in to the application using their email and password.
- **JWT Authentication** 🔑: JSON Web Token (JWT) authentication is implemented for secure user authentication.
- **Upload Profile Images Using Cloudinary** 📷: Users can upload profile images, which are stored on Cloudinary for efficient image management.
- **Edit Profile** ✏️: Users have the ability to edit their profile information, including their name and profile picture.
- **Reset Password** 🔑: Users can reset their password if they forget it.
- **Delete Account** ❌: Users can delete their account permanently.

### Admin Side
- **Show All Users** 👥: Admins can view a list of all users registered in the application.
- **Delete Users** ❌: Admins have the authority to delete user accounts as needed.
- **JWT Authentication** 🔑: Admins are authenticated using JSON Web Tokens for secure access.
- **Login with Email and Password** 🔒: Admins can log in to the application using their email and password.
- **Edit Users** ✏️: Admins can edit user details, such as name, email, and profile picture.
- **Search Users** 🔍: Admins can search for specific users based on their details.

## Setup

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up Cloudinary account and obtain API credentials.
4. Set up MongoDB and replace the connection string with your database URL.
5. Start the development server using `npm run dev`.

## Usage

- Visit the deployed application to perform CRUD operations and upload profile images.
- Ensure MongoDB is running locally or replace the connection string with your database URL.
- Use Cloudinary API credentials for image uploading.

## Contributing

![Preview Image](preview.png)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
