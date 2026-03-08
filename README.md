# Netflix Clone (TMDB Powered)

A production-ready Netflix-style web application built with React, Vite, and Tailwind CSS.

## Features

- 🔐 **Authentication System** - Signup and Login with LocalStorage persistence
- 🎬 **Movie Discovery** - Browse trending, popular, top-rated, and upcoming movies
- 🔍 **Search Functionality** - Search movies using TMDB API
- 🎭 **Movie Details Modal** - View detailed information about movies
- 🎨 **Netflix-style UI** - Dark theme with smooth animations
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- React 19
- Vite
- React Router DOM
- Axios
- Context API (Authentication)
- Tailwind CSS
- TMDB API

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
  components/
    Navbar.jsx
    MovieRow.jsx
    MovieCard.jsx
    Modal.jsx
    ProtectedRoute.jsx
  pages/
    Login.jsx
    Signup.jsx
    Home.jsx
    Search.jsx
  context/
    AuthContext.jsx
  services/
    tmdb.js
  App.jsx
  main.jsx
```

## API

This project uses [The Movie Database (TMDB) API](https://www.themoviedb.org/).

## License

MIT
update
