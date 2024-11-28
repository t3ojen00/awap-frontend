import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Showtime from "../showtimes/Showtime";

const TheaterShowtimes = () => {
  const { theaterId } = useParams(); // Get the theater ID from the URL
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheaterShowtimes = async () => {
      try {
        const response = await fetch(
          `https://www.finnkino.fi/xml/Schedule/?area=${theaterId}&nrOfDays=7`
        );
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");
        const showElements = xmlDoc.getElementsByTagName("Show");

        const theaterShowtimes = Array.from(showElements).map((show) => ({
          id: show.getElementsByTagName("ID")[0]?.textContent,
          title: show.querySelector("Title")?.textContent,
          time: show.querySelector("dttmShowStart")?.textContent,
          theater: show.querySelector("Theatre")?.textContent,
          picture:
            show.querySelector("EventSmallImagePortrait")?.textContent || "",
        }));

        setShowtimes(theaterShowtimes);
      } catch (error) {
        console.error("Error fetching theater showtimes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTheaterShowtimes();
  }, [theaterId]);

  if (loading) {
    return <div>Loading showtimes...</div>;
  }

  if (showtimes.length === 0) {
    return <div>No showtimes available for this theater.</div>;
  }

  return (
    <div>
      <h1>Showtimes for Theater</h1>
      <div className="showtimes-container">
        {showtimes.map((show) => (
          <Showtime
            key={show.id}
            id={show.id}
            title={show.title}
            theatre={show.theater}
            startTime={show.time}
            picture={show.picture}
          />
        ))}
      </div>
    </div>
  );
};

export default TheaterShowtimes;
