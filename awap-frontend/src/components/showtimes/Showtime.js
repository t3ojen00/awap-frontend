import React from 'react'
import './Showtime.css'

export default function Showtime({ title, theatre, startTime, picture }) {

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
      </div>
    </div>
  );
}
