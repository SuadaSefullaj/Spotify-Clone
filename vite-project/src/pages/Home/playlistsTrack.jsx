import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import getAccessToken from "../../Spotify Api/spotifyAuth";
import { FaClock } from "react-icons/fa";
import "./playlistsTracks.css";
import HomeLayout from "../../layouts/HomeLayout";

const PlaylistTracks = () => {
  const { playlistId } = useParams(); //useParams hook to get the playlistId from the URL parameters 
  const [tracks, setTracks] = useState([]);

  const location = useLocation();
  const { playlistData } = location.state || {};

  const isSpotifyPlaylist = playlistData && playlistData.images && playlistData.images[0];

  const fetchTracks = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await fetch(
       `https://api.spotify.com/v1/playlists/${isSpotifyPlaylist ? playlistData.id : playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (data.items) {
        setTracks(data.items);
        
      }
    } catch (error) {
      console.error("Error fetching playlist tracks:", error);
    }
  };

  //fetchTracks(); it cause an infinite loop so we should use useEffect

  useEffect(() => {
      console.log("playlistData:", playlistData);
    fetchTracks();
  }, [playlistData?.id, playlistId]);

  // Function to format a date with abbreviated month names
  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Function to format duration in milliseconds
  function formatDuration(durationInMs) {
    const minutes = Math.floor(durationInMs / 60000);
    const seconds = ((durationInMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  return (
    <HomeLayout>
      <div className="playlist-tracks-container">
        <div className="track-playlist">
        {isSpotifyPlaylist && (
            <img
              className="track-playlist-cover"
              src={playlistData.images[0].url}
              alt={playlistData.name}
            />
          )}
          <div className="track-playlist-info">
            {isSpotifyPlaylist ? (
              <>
                <h6 className="playlist-on-top">Playlist</h6>
                <h1 className="track-playlist-name">{playlistData.name}</h1>
                <p className="track-playlist-description">
                  {playlistData.description}
                </p>
              </>
            ) : (
              <div className="user-playlist-info">
                {playlistData && playlistData.images && playlistData.images[0] && (
                  <img
                    src={playlistData.images[0].url}
                    className="playlist-icon"
                    alt="Playlist Cover"
                  />
                )}
                <div className="user-playlist-text">
                  <h6 className="playlist-on-top">Playlist</h6>
                  {playlistData && playlistData.name && (
                    <h1 className="playlist-title">{playlistData.name}</h1>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="playlist-tracks">
          <table className="hoverable-table">
            {/* Table header */}
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" style={{ textAlign: "start" }}>
                  Title
                </th>
                <th scope="col" style={{ textAlign: "start" }}>
                  Album
                </th>
                <th scope="col" style={{ textAlign: "start" }}>
                  Date Added
                </th>
                <th style={{ paddingLeft: "120px" }}>
                  <FaClock />
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {tracks.map((track, index) => (
                <tr key={track.track.id} className="hover-row">
                  <th scope="row" style={{ paddingRight: "10px" }}>
                    {index + 1}
                  </th>
                  <td>
                    <div
                      className="track-container"
                      style={{ maxWidth: "600px" }}
                    >
                      <img
                        src={track.track.album.images[0].url}
                        className="song-img"
                        alt={track.track.name}
                        style={{ maxWidth: "100px" }}
                      />
                      <div className="song-info">
                        <h4 className="song-name">{track.track.name}</h4>
                        <h6 className="singer">
                          {track.track.artists
                            .map((artist) => artist.name)
                            .join(", ")}
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td style={{ maxWidth: "400px" }}>
                    {track.track.album.name}
                  </td>
                  <td>{formatDate(track.added_at)}</td>
                  <td style={{ paddingLeft: "120px" }}>
                    {formatDuration(track.track.duration_ms)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </HomeLayout>
  );
};

export default PlaylistTracks;
