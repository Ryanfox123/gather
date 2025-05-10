# 🚀 Gather App

A full-stack web application built with Next.js, MongoDB, and Google OAuth. This project allows users to browse and sign up for future events then add them to their Google calendar.

You can view the live version [here](https://gather-lime.vercel.app/)

---

## 🛠️ Getting Started

Follow these instructions to set up and run the project locally.

### 1. **Clone the Repository**

```bash
git clone https://github.com/Ryanfox123/gather
cd gather
```

### 2. **Install Dependencies**

```bash
npm install
# or
yarn install
```

### 3. **Environment Variables**

Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SECRET=your_general_oauth_secret
```

> 🔐 Make sure to never commit `.env.local` to version control. It contains sensitive information.

### 4. **Set Up Your MongoDB Cluster**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
2. Create a database (e.g., `myAppDB`) and add two collections: `users` and `events`.
3. Replace `your_mongodb_connection_string` in `.env.local` with your actual MongoDB URI.

### 5. **Seed Your Database (Optional)**

There is some test data available in the `src/data` folder. You can use it to populate your MongoDB collections manually. I would recommend downloading [MongoDB Compass](https://www.mongodb.com/try/download/compass) to quickly insert the data files in.

### 6. **Run the Development Server**

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## ✨ Features

- 🔐 Google OAuth authentication via NextAuth
- 📦 MongoDB integration for persistent user and event data
- 📁 Easily extendable and developer-friendly codebase
- 🧪 Seed data for testing in `src/data`

---

## Sign-In Details

### Non-Admin User

- **Email**: non-admin@test.com
- **Password**: 123

### Admin User

- **Email**: admin@test.com
- **Password**: 123
