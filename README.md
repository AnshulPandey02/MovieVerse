# 🎬 MovieVerse

**MovieVerse** is a full-stack movie discovery web application built using the **MERN Stack** — MongoDB, Express.js, React.js, and Node.js.

The application allows users to explore movies, view detailed information, manage favorites and watchlists, create an account, and manage their profile securely.

---

## 🚀 Features

* 🔐 **User Authentication** – Register, login, and manage user sessions securely.
* ❤️ **Favorites System** – Save and manage your favorite movies.
* 🔖 **Watchlist** – Keep track of movies you want to watch later.
* 👤 **User Profile** – View and update your personal details.
* 🔄 **Password Management** – Change or reset your password securely.
* 🎞️ **Dynamic Movie Data** – Movie details are fetched using the **TMDB API**.
* 🌐 **Movie Information** – View movie details, cast, reviews, and additional information.
* 🌗 **Responsive Design** – Optimized for desktop and mobile devices.
* ⚡ **Smooth UI/UX** – Built using React with animations and an interactive user interface.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Framer Motion
* React Toastify
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Nodemailer

### External API

* [TMDB (The Movie Database) API](https://developer.themoviedb.org/)

---

## 📦 Installation and Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/AnshulPandey02/MovieVerse.git
```

### 2️⃣ Navigate to the Project

```bash
cd MovieVerse
```

### 3️⃣ Install Backend Dependencies

```bash
cd Backend
npm install
```

### 4️⃣ Install Frontend Dependencies

Open another terminal and run:

```bash
cd Frontend
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **Backend** folder and add the required environment variables.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
GOOGLE_CLIENT_ID=your_google_client_id
```

Create a `.env` file in the **Frontend** folder:

```env
VITE_TMDB_API=your_tmdb_api_key
VITE_BACKEND_URL=http://localhost:5000
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_client_id
VITE_EMAIL_API_KEY=your_email_api_key
```

> ⚠️ Never upload your actual `.env` files or API keys to GitHub.

---

## ▶️ Run the Application

### Start the Backend

```bash
cd Backend
npm start
```

### Start the Frontend

Open another terminal:

```bash
cd Frontend
npm run dev
```

Then open the application in your browser:

```text
http://localhost:5173
```

---

## 📁 Folder Structure

```text
MovieVerse/
│
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── Frontend/
│   ├── public/
│   └── src/
│       ├── Components/
│       ├── Pages/
│       └── ...
│
└── README.md
```

---

## 🌐 GitHub Repository

💻 **Repository:**
https://github.com/AnshulPandey02/MovieVerse

---

## 🧠 What I Learned

While building MovieVerse, I worked with and learned:

* Full-stack development using the MERN stack.
* User authentication and authorization using JWT.
* Secure password management and authentication workflows.
* MongoDB database integration using Mongoose.
* REST API development using Express.js.
* Integrating third-party APIs such as TMDB.
* Managing application state and API communication in React.
* Building responsive and interactive user interfaces.

---

⭐ If you like **MovieVerse**, consider giving the repository a star!
