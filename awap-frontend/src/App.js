import React from "react";
import "./App.css";
import MovieSearchXml from "./MovieSearchXml";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Showtimes from "./components/showtimes/Showtimes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/authContext";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Logout from "./pages/logout";
import Delete from "./pages/delete";
import { Toaster } from "react-hot-toast";
import ShowtimePage from "./components/showtimes/showtimePage";

// add the proper routes for each page
// createBroserRouter and so on which were used in the todo assignment

// in the page you can now go to url/showtimes or url/search for the search and showtimes pages

// old code for app just in case
/* function App() {
  return (
    <div className="App">
      <MovieSearchXml/>
    </div>
  );
} */

function App() {
  return (
    <AuthProvider>
      <Toaster />

      <div className="App">
        <BrowserRouter>
          <Header></Header>
          <div className="page-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/delete/:id" element={<Delete />} />
              <Route path="/showtimes" element={<Showtimes />} />
              <Route path="/showtime/:id" element={<ShowtimePage />} />
              <Route path="/search" element={<MovieSearchXml />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
        <Footer></Footer>
      </div>
    </AuthProvider>
  );
}

export default App;
