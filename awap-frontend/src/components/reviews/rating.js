import React, { useState, useEffect } from "react";
import apiClient from "../../lib/api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RatingComponent = ({ movieId, loggedInUser }) => {
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(null); // Track the current user's rating
  
  useEffect(() => {
    // Fetch the current rating for this movie when the component mounts
    const fetchRating = async () => {
      try {
        const response = await apiClient.get(`/movies/${movieId}/rating`);
        setRating(response.data.rating);
        if (loggedInUser) {
          // Check if the user has rated this movie already
          const userResponse = await apiClient.get(`/movies/${movieId}/rating`, {
            params: { userId: loggedInUser.id },
          });
          setUserRating(userResponse.data.rating);
        }
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };
  
    fetchRating();
  }, [movieId, loggedInUser]);

  const handleRating = async (newRating) => {
    try {
      // Post the new rating to the backend
      await apiClient.post(`/movies/${movieId}/rating`, {
        rating: newRating,
        userId: loggedInUser.id,
      });

      // Update the state with the new rating
      setRating(newRating);
      setUserRating(newRating);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  return (
    <div>
      <h3>Current Rating: {rating} / 5</h3>
      {loggedInUser && (
        <div>
          <h4>Your Rating</h4>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                icon={faStar}
                className={`star-icon ${star <= (userRating || rating) ? 'filled' : ''}`}
                onClick={() => handleRating(star)}
                style={{
                  cursor: 'pointer', 
                  color: star <= (userRating || rating) ? 'gold' : 'gray',
                }}
                disabled={userRating !== null}  // Prevent changing the rating after it's been set
              />
            ))}
          </div>
          {userRating && <p>Your rating: {userRating} ⭐</p>}
        </div>
      )}
    </div>
  );
};

export default RatingComponent;