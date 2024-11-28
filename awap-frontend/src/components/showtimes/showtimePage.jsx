import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ShowtimePage = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(
          `https://www.finnkino.fi/xml/Schedule?showId=${id}`
        );
        const xmlText = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const showElements = xmlDoc.getElementsByTagName("Show");
        for (const show of showElements) {
          const showId = show.getElementsByTagName("ID")[0].textContent;
          if (showId === id) {
            setShowDetails({
              title: show.querySelector("Title")?.textContent,
              time: show.querySelector("dttmShowStart")?.textContent,
              theater: show.querySelector("Theatre")?.textContent,
              duration: show.querySelector("LengthInMinutes")?.textContent,
              picture: show.getElementsByTagName("EventSmallImagePortrait")[0]
                .textContent,
              genres: show.querySelector("Genres")?.textContent,
              rating: show.querySelector("Rating")?.textContent,
              releaseDate: show.querySelector("dtLocalRelease")?.textContent,
              language: show.querySelector("SpokenLanguage > Name")
                ?.textContent,
              subtitles: Array.from(
                show.getElementsByTagName("SubtitleLanguage1")
              )
                .map((lang) => lang.querySelector("Name")?.textContent)
                .join(", "),
              presentation: show.querySelector("PresentationMethodAndLanguage")
                ?.textContent,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching show details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (loading) {
    return <div>Loading show details...</div>;
  }

  if (!showDetails) {
    return <div>Show details not available.</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "50vh",
        marginTop: "10vh",
      }}
    >
      <h1
        style={{
          fontSize: "2.5em",
          marginBottom: "20px",
        }}
      >
        {showDetails.title}
      </h1>
      <div className="showtime-image">
        <img
          style={{
            borderRadius: "10px",
          }}
          src={showDetails.picture}
          alt={`${showDetails.title} poster`}
        />
      </div>
      <p style={{ marginTop: "20px", fontSize: "1.2em" }}>
        <strong>Time:</strong> {showDetails.time}
      </p>
      <p>
        <strong>Theater:</strong> {showDetails.theater}
      </p>
      <p>
        <strong>Duration:</strong> {showDetails.duration} minutes
      </p>
      <p>
        <strong>Genres:</strong> {showDetails.genres}
      </p>
      <p>
        <strong>Rating:</strong> {showDetails.rating}
      </p>
      <p>
        <strong>Release Date:</strong>{" "}
        {new Date(showDetails.releaseDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Language:</strong> {showDetails.language}
      </p>
      <p>
        <strong>Subtitles:</strong> {showDetails.subtitles || "None"}
      </p>
      <p>
        <strong>Presentation:</strong> {showDetails.presentation}
      </p>
      <button
        style={{
          maxWidth: "40%",
          marginTop: "20px",
        }}
        onClick={() => {
          const shareUrl = `${window.location.origin}/showtime/${id}`;
          navigator.clipboard.writeText(shareUrl);
          toast.success("Link copied to clipboard!");
        }}
        className="showtime-button"
      >
        Share
      </button>
    </div>
  );
};

export default ShowtimePage;
