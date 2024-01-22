import React from "react";
import "./search-body.css";

const images = [
  "src/browse-playlists/podcast.png",
  "src/browse-playlists/live-events.png",
  "src/browse-playlists/made-for-you.png",
  "src/browse-playlists/new-releases.png",
  "src/browse-playlists/pop.png",
  "src/browse-playlists/hip-hop.png",
  "src/browse-playlists/rock.png",
  "src/browse-playlists/latin.png",
  "src/browse-playlists/educational.png",
  "src/browse-playlists/documentary.png",
  "src/browse-playlists/comedy.png",
  "src/browse-playlists/pop-culture.png",
  "src/browse-playlists/charts.png",
  "src/browse-playlists/dance-electronic.png",
  "src/browse-playlists/mood.png",
  "src/browse-playlists/indie.png",
  "src/browse-playlists/workout.png",
  "src/browse-playlists/discover.png",
];
const SearchBody = () => {
  return (
    <div className="SearchBody">
      <h1 className="SearchBody-title">Browse All</h1>
      <div className="image-grid">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};
export default SearchBody;
