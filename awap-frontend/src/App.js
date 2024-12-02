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
import GroupForum from "./components/forum/GroupForum";

import Home from "./components/home/Home";
import GroupPageGeneral from "./components/groups/groupsPageGeneral";

import TheaterShowtimes from "./components/footer/TheaterShowtimes";

// Ha add: discuss more about add showtime to home or not??
import MovieShowtimes from "./components/home/MovieShowtimes";
import AboutUs from "./components/aboutus/AboutUs";

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
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/delete/:id" element={<Delete />} />
              <Route path="/showtimes" element={<Showtimes />} />
              <Route path="/showtime/:id" element={<ShowtimePage />} />
              <Route path="/search" element={<MovieSearchXml />}></Route>

              <Route path="/groups" element={<GroupPageGeneral />} />
              <Route path="/forum/:id" element={<GroupForum />} />
              <Route path="/aboutus" element={<AboutUs/>}></Route>
              <Route
                path="/showtime_footer/:theaterId"
                element={<TheaterShowtimes />}
              />

              {/* Ha add: discuss more about add showtime to home or not?? Not finish css */}
              <Route
                path="/showtimes_home/:movieName"
                element={<MovieShowtimes />}
              />
            </Routes>
          </div>
        </BrowserRouter>
        <Footer></Footer>
      </div>
    </AuthProvider>
  );
}

export default App;
