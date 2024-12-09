import React, { useState, useEffect } from "react";
import "./MovieSearchXml.css";
import FilterSidebar from "./components/FilterSidebar";
import MovieCard from "./components/MovieCard";
import { useLocation } from "react-router-dom"; //add for footer link
import apiClient from "../src/lib/api";
import { toast } from "react-hot-toast";
import RatingReview from "./components/showtimes/ratingreview";
function MovieSearchXml() {
  const location = useLocation(); //add for footer link
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Extract genre from URL query parameters for footer link
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genre = params.get("genre");
    if (genre) {
      setSelectedGenre(genre);
    }
  }, [location]);

  useEffect(() => {
    fetch("https://www.finnkino.fi/xml/Events/")
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        const events = Array.from(xml.getElementsByTagName("Event"));

        const movies = events.map((event) => ({
          id: event.querySelector("ID")?.textContent,
          title: event.querySelector("Title")?.textContent,
          productionYear: event.querySelector("ProductionYear")?.textContent,
          genres: event.querySelector("Genres")?.textContent,
          imageUrl: event.querySelector("Images > EventMediumImagePortrait")
            ?.textContent,
          synopsis: event.querySelector("Synopsis")?.textContent,
          cast: Array.from(event.querySelectorAll("Cast Actor")).map(
            (actor) => ({
              firstName: actor.querySelector("FirstName")?.textContent,
              lastName: actor.querySelector("LastName")?.textContent,
            })
          ),
        }));
        setMoviesData(movies);
      })
      .catch((error) =>
        console.error("Error fetching or parsing XML data:", error)
      );
  }, []);

  const handleResetFilters = () => {
    // Reset all filter states to default values
    setSearchTerm("");
    setSelectedYear("");
    setSelectedGenre("");
  };

  const filteredMovies = moviesData.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedYear || movie.productionYear === selectedYear) &&
      (!selectedGenre ||
        movie.genres.toLowerCase().includes(selectedGenre.toLowerCase()))
    );
  });

  return (
    <div>
      <h2 className="main-title">
        From classics to the latest hits, find movies you'll love
      </h2>

      <div className="movie-search-container">
        <FilterSidebar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          selectedYear={selectedYear}
          onYearChange={(e) => setSelectedYear(e.target.value)}
          selectedGenre={selectedGenre}
          onGenreChange={(e) => setSelectedGenre(e.target.value)}
          moviesData={moviesData}
          onResetFilters={handleResetFilters} // Pass down the reset handler
        />

        <section className="search-results">
          {selectedMovie ? (
            <div className="movie-details">
              <button onClick={() => setSelectedMovie(null)}>
                Back to List
              </button>
              <FavouriteButton movieId={selectedMovie.id} />
              <h2>
                {selectedMovie.title} ({selectedMovie.productionYear})
              </h2>
              <img src={selectedMovie.imageUrl} alt={selectedMovie.title} />
              <p>{selectedMovie.synopsis}</p>
              <h4>Cast:</h4>
              <ul>
                {selectedMovie.cast.map((actor, index) => (
                  <li key={index}>
                    {actor.firstName} {actor.lastName}
                  </li>
                ))}
              </ul>
                            {/* Rating and Review Section */}
                            <RatingReview
                showId={selectedMovie.id} // Pass the movie ID
                reviews={reviews} // Pass the reviews state
                setReviews={setReviews} // Pass the setter for reviews
              />
            </div>
          ) : (
            <div className="movie-card-container">
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSelect={setSelectedMovie}
                  />
                ))
              ) : (
                <div className="no-results">
                  <p>No movies found matching your criteria.</p>
                  <button onClick={handleResetFilters}>Back to List</button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default MovieSearchXml;

const FavouriteButton = ({ movieId }) => {
  return (
    <button
      onClick={async () => {
        toast.promise(apiClient.post("/favorites/add", { movie_id: movieId }), {
          pending: "Adding to favorites...",
          success: "Added to favorites!",
          error: "Error adding to favorites!",
        });
      }}
      style={{
        backgroundColor: "#007bff",
        marginLeft: "10px",
      }}
    >
      Favourite
    </button>
  );
};
