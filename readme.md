# To-Do Task Application

This is a simple To-Do Task application that allows users to add, edit, mark as complete, and delete tasks. The project is divided into a frontend built with React and a backend built with Node.js and Express.

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)

## Live Demo

You can check out the live demo of the frontend deployed on Vercel: [To-Do Task Frontend](https://to-do-task-frontend.vercel.app)

## Backend

The backend of this application is deployed on Render, which is a serverless platform. Here are a few important points regarding this deployment:

- Serverless Nature: The backend deployment on Render is serverless, which means that the server does not run continuously. Instead, it starts up when a request is made and may go idle after a period of inactivity.
- Initialization Time: When the backend receives an initial request after being idle, it takes a short amount of time to start up. This is a one-time delay and subsequent requests will be processed quickly.
- Smooth Performance: Once the server is up and running, it handles requests smoothly and efficiently. This setup allows for efficient resource usage and cost-effectiveness, particularly for applications with intermittent usage.

## Features

- Add new tasks with a title, description, and due date.
- Edit existing tasks.
- Mark tasks as complete.
- Delete tasks.

## Technologies

- Frontend: React, Redux Toolkit, Axios
- Backend: Node.js, Express
- Database: MongoDB (or any other database you use)
- Deployment: Vercel (frontend), Render (backend)

## Getting Started

Follow these instructions to get a copy of the project running on your local machine.

### Prerequisites

Ensure you have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)
- MongoDB (if using locally)

### Installation

1. **Clone the repository for Frontend**

   ```sh
   git clone https://github.com/AtharvKhamkar/To_Do_Task_Frontend.git
   cd To_Do_Task_Frontend
   ```

2. **Clone the repository for Backend**

   ```sh
   git clone https://github.com/AtharvKhamkar/ToDo_Task_Backend.git
   cd ToDo_Task_Backend

   ```

3. **Install dependencies for both frontend and backend**

   ```sh
   # For frontend
   cd To_Do_Task_Frontend
   npm install

   # For backend
   cd ToDo_Task_Backend
   npm install
   ```

### Running the Application

1. **Start the backend server**

   ```sh
   cd ToDo_Task_Backend
   npm run dev
   ```

   The backend server will start on `http://localhost:2020`.

2. **Start the frontend server**

   ```sh
   cd To_Do_Task_Frontend
   npm run dev
   ```

   The frontend server will start on `http://localhost:5173/`.

## Usage

1. Open your browser and go to `http://localhost:5173/`.
2. You will see the To-Do Task application interface where you can add, edit, mark as complete, and delete tasks.

## Sample Screenshots

![Alt text](/To_Do_Task_Frontend/public/frontend_demo_1.png)
![Alt text](/To_Do_Task_Frontend/public/frontend_demo_2.png)
