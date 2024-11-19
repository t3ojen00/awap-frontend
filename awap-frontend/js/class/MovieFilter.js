import React, { useState } from 'react';
import axios from 'axios';

const MovieFilter = () => {
    const [genre, setGenre] = useState(''); // To store the selected genre
    const [movies, setMovies] = useState([]); // To store the fetched movies
    const [loading, setLoading] = useState(false); // To show loading state

    // Handle genre selection
    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    // Fetch movies by genre
    const fetchMovies = async () => {
        if (!genre) {
            alert('Please select a genre!');
            return;
        }

        setLoading(true); // Set loading state
        try {
            const response = await axios.get(`/api/movies/genre/${genre}`); // Make request to backend
            setMovies(response.data); // Set movies in state
        } catch (error) {
            console.error('Error fetching movies:', error.message);
        } finally {
            setLoading(false); // Turn off loading state
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Filter Movies by Genre</h2>
            {/* Dropdown to select genre */}
            <select value={genre} onChange={handleGenreChange}>
                <option value="">Select a Genre</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Action">Action</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
            </select>
            <button onClick={fetchMovies} style={{ marginLeft: '10px' }}>
                Fetch Movies
            </button>

            {/* Show loading state */}
            {loading && <p>Loading movies...</p>}

            {/* Display movies */}
            <div>
                {movies.map((movie, index) => (
                    <div key={index} style={{ margin: '10px 0' }}>
                        <h3>{movie.Title}</h3>
                        <p>{movie.Genres}</p>
                        <p>{movie.TheatreAndShowTimes}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieFilter;
