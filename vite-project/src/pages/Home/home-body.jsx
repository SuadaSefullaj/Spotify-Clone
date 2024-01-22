import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home-body.css";
import { IoIosArrowForward } from "react-icons/io";
import getAccessToken from "../../Spotify Api/spotifyAuth";

const HomeBody = ({ onPlaylistSelect }) => {
  const [accessToken, setAccessToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [showAll, setShowAll] = useState(false);

  //To navigate to a different route
  const navigate = useNavigate();

  useEffect(() => {
    getAccessToken().then((token) => {
      setAccessToken(token);

      fetch("https://api.spotify.com/v1/browse/featured-playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.playlists && data.playlists.items) {
            setPlaylists(
              showAll ? data.playlists.items : data.playlists.items.slice(0, 5)
            );
          }
        })
        .catch((error) => console.error("Error fetching playlists:", error));
    });
  }, [showAll]);

  const handleShowAllClick = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const handlePlaylistClick = (playlistId,playlistData) => {
    navigate(`/playlist/${playlistId}`, { state: { playlistData } });
  };

  return (
    <div className="body">
      <div className="header-of-body">
        <h1 className="body-title">Spotify Playlists</h1>
        <button className="showAll-btn" onClick={handleShowAllClick}>
          Show All
        </button>
      </div>

      <section className="playLists">
        {playlists.map((playlist) => {
          console.log("Playlist ID:", playlist.id);
          return (
            <PlayList
              key={playlist.id}
              title={playlist.name}
              description={playlist.description}
              img={playlist.images[0].url}
              playlist={playlist}
              onPlaylistClick={() => handlePlaylistClick(playlist.id,playlist)}
            />
          );
        })}
      </section>
    </div>
  );
};

const PlayList = (props) => {
  console.log("PlayList Component Props:", props);
  const { img, title, description, playlist, onPlaylistClick } = props;

  return (
    <article className="PlayList">
      <div className="playlist-content">
        <div onClick={onPlaylistClick}>
          <img src={img} alt={title} className="playlist-img" />
          <h2 className="playlist-title">{title}</h2>
          <p className="playlist-description">{description}</p>
          <button className="arrow-btn">&#9658;</button>
        </div>
      </div>
    </article>
  );
};

export default HomeBody;
