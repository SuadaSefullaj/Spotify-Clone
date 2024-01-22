import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpotify } from "react-icons/fa";
import { FiHome, FiSearch, FiMusic } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { IoAddOutline, IoHeartOutline } from "react-icons/io5";
import { BiDownload } from "react-icons/bi";
import "./sidebar.css";
import { useUser } from "../../context/UserContext";
import PlaylistTracks from "../Home/playlistsTrack";

const Sidebar = ({ onClearButtonClick, onPlaylistSelect }) => {
  const { user, setUserData } = useUser(); // Use the useUser hook to get user data
  const [userPlaylists, setUserPlaylists] = useState([]);

  const spotifyAccessToken = user.spotifyToken;

  const fetchUserPlaylists = async () => {
    try {
      const playlistsResponse = await fetch(
        `https://api.spotify.com/v1/me/playlists`,
        {
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`,
          },
        }
      );

      if (!playlistsResponse.ok) {
        throw new Error("Error fetching user playlists");
      }

      const playlistsData = await playlistsResponse.json();
      console.log("Playlists Data:", playlistsData);

      
      // Save playlists to localStorage
      localStorage.setItem("userPlaylists", JSON.stringify(playlistsData.items));
      setUserPlaylists(playlistsData.items);
    } catch (error) {
      console.error("Error fetching user playlists:", error);
    }
  };

  useEffect(() => {
      // Load user playlists from localStorage 
    const storedUserPlaylists = localStorage.getItem("userPlaylists");
    if (storedUserPlaylists) {
      setUserPlaylists(JSON.parse(storedUserPlaylists));
    } else {
      // Fetch user playlists if not found in localStorage
      fetchUserPlaylists();
    }
  }, [spotifyAccessToken]);

  console.log("User Playlists:", userPlaylists);

  const handleClearButtonClick = () => {
    onClearButtonClick(); // Notify the parent component
  };

  const handlePlaylistClick = (playlistId, playlistData) => {
    onPlaylistSelect(playlistId, playlistData);
  };
  return (
    <div >
      <div className="sidebar">
        {/* Top Section */}
        <div className="sidebar-top">
          <div className="spotify-logo-container">
            <FaSpotify className="spotify-logo" />
            <div >
            <span className="spotify-name">
              Spotify
              
            </span>
            <FaTimes
                className="clear-button"
                onClick={handleClearButtonClick}
              />
          </div>
          </div>
          <div className="top-section">
            <Link to="/home">
              <div className="top-section-icon">
                <FiHome className="sidebar-icon" />
                <div className="icon-name">Home</div>
              </div>
            </Link>
            <Link to="/search">
              <div className="top-section-icon">
                <FiSearch className="sidebar-icon" />
                <div className="icon-name">Search</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Middle Section */}
        <div className="sidebar-middle">
          <div className="middle-section-icon ">
            <div className="left-side-library">
              <div>
                <FiMusic className="sidebar-icon" />
              </div>
              <div className="icon-name">Your Library</div>
            </div>
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Create playlist"
              style={{ cursor: "pointer" }}
            >
              <IoAddOutline className="plus-icon" />
            </div>
          </div>
          <div className="sidebar-middle-playlists">
         {/* Display user playlists dynamically */}
         {userPlaylists.map((playlist) => (
             <Link
             key={playlist.id}
             to={`/playlist/${playlist.id}`}
             onClick={() =>
               handlePlaylistClick(playlist.id, {
                 cover: playlist.images[0]?.url,
                 title: playlist.name,
               })
             }
           >
              <div className="playlist-section">
                <img
                  src={playlist.images[0]?.url }
                  className="playlist-icon"
                  alt="Playlist Cover"
                />
                <h4 className="playlist-title">{playlist.name}</h4>
              </div>
            </Link>
          ))}
          </div>
          
        </div>

        {/* Bottom Section */}
        <div className="sidebar-bottom">
          <BiDownload className="sidebar-icon" />
          <div className="icon-name">
            <a href="https://www.spotify.com/de-en/download/other/">
              Install App
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


