import React from "react";
import "./Showtime.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Showtime({ title, theatre, startTime, picture, id }) {
  // return a template for each individual showtime that can be used
  // this will be imported in the showtimes file which fetches the data
  return (
    <div className="showtime-card">
      <div className="showtime-image">
        <img src={picture} alt={`${title} poster`} />
      </div>
      <div className="showtime-info">
        <h3 className="showtime-title">{title}</h3>
        <p className="showtime-details">
          {theatre} - {new Date(startTime).toLocaleString()}
        </p>
        <div className="showtime-buttons">
          <Link to={`/showtime/${id}`}>
            <button className="showtime-button">View Showtime</button>
          </Link>
          <button
            onClick={() => {
              //copy to clipboard the id and construct the url for the currrent webpage link
              const shareUrl = `${window.location.origin}/showtime/${id}`;
              navigator.clipboard.writeText(shareUrl);
              toast.success("Link copied to clipboard!");
            }}
            className="showtime-button"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
