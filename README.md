# Graded Unit 2: Full-Stack Web Application

## 🌐 Live Application

You can access the deployed application here:
**[https://graded-unit2-1.onrender.com/](https://graded-unit2-1.onrender.com/)**

## 📂 GitHub Repository

The complete source code is available at:
**[https://github.com/Fridrex/graded_unit2](https://github.com/Fridrex/graded_unit2)**

## 🌿 Branching Strategy

A brief overview of the branching strategy used for this project:

* **`main`**: This branch initially contained the primary backend development work.
* **`front-end`**: Development shifted to this branch for integrating the frontend with the backend. Despite its name, this branch includes the complete, combined full-stack codebase before final deployment adjustments.
* **`render-deploy`**: This branch was specifically created to fine-tune the application for a successful production deployment on Render.com. It contains the latest and most stable version of the deployed code.

---
## ✨ Key Features

* **Wallet**: Wallet creation, Wallet access by seed phrase, Sending and Receiving funds
* **Learn**: Quiz completion, Certificate generation

## 🛠️ Technologies Used

* **Frontend**: React, CSS, Axios, Chart.js, Motion, React Router
* **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, uuid, CORS
* **Deployment**: Render.com

---
## 🚀 Getting Started

### Prerequisites

* Node.js (v18.x or later), npm/yarn, MongoDB connection string

### Local Installation & Setup

1.  Clone the repository:
    ```bash
    git clone [https://github.com/Fridrex/graded_unit2.git](https://github.com/Fridrex/graded_unit2.git)
    cd graded_unit2
    ```
2.  Checkout the deployment branch (or the most complete one):
    ```bash
    git checkout render-deploy
    ```
3.  Install backend dependencies:
    ```bash
    cd backend
    npm install
    # or yarn install
    cd ..
    ```
4.  Install frontend dependencies:
    ```bash
    cd frontend
    npm install
    # or yarn install
    cd ..
    ```
5.  Set up environment variables:
    * Create a `.env` file in the backend directory.
    * Add necessary variables like `MONGODB_URI`, `JWT_SECRET`, `PORT`, `SESSION_SECRET`.
6.  Run the application:
    * Start the backend server (`cd backend && npm run start`).
    * Start the frontend development server (`cd frontend && npm run dev`).

---