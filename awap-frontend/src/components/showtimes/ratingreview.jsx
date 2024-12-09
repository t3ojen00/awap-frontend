import React, { useState } from "react";
/*import toast from "react-hot-toast";
import ReviewComponent from "../reviews/reviews";
import RatingComponent from "../reviews/rating"*/
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const RatingReview = ({ showId, reviews, setReviews, loggedInUser }) => {
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(0);
  
    const handlePostReview = () => {
      if (!newReview.trim() || rating <= 0) {
        alert("Please provide a valid review and rating.");
        return;
      }
  
      const review = {
        id: Date.now(), // Unique ID for the review
        content: newReview,
        rating: rating,
      };
  
      // Add the review to the list of reviews
      setReviews([...reviews, review]);
  
      // Reset input fields
      setNewReview("");
      setRating(0);
    };
  
    // Render stars function to show filled stars based on rating
    const renderStars = (rating) => {
      return [...Array(5)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className={index < rating ? "filled" : ""}
          style={{
            color: index < rating ? "gold" : "gray",
            fontSize: "1.5rem",
            cursor: "pointer", // Make stars clickable
          }}
          onClick={() => setRating(index + 1)} // Update rating when a star is clicked
        />
      ));
    };
  
    return (
      <div className="rating-review-container">
        <h3>Leave a Review</h3>
        <div className="rating-input">
          <label htmlFor="rating"> </label>
          <div className="rating-stars">
            {/* Display clickable stars for rating */}
            {renderStars(rating)}
          </div>
        </div>
        <textarea
          className="review-textbox"
          placeholder="Write your review here..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <button className="post-review-btn" onClick={handlePostReview}>
          Post Review
        </button>
        <div className="reviews-list">
          <h4>Reviews</h4>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="review-item">
                <p>
                  <strong>Rating: </strong>
                  {renderStars(review.rating)} {/* Show stars instead of rating number */}
                </p>
                <p>{review.content}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    );
  };
  
  export default RatingReview;