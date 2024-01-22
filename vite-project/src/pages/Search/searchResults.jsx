import React, { useEffect } from "react";
import "./searchResults.css";
import SearchForm from "./SearchForm";

const SearchResults = ({ searchData }) => {
  // Check if albums is undefined or null
  if (searchData.length === 0) {
    return <h1>No albums available</h1>;
  }

  console.log("searchData type:", typeof searchData);
  console.log("searchData content:", searchData);

  // Extract the first track from topTracks
  const topResultTrack = searchData.topTracks[0];
  const topTracks = searchData.topTracks;

  // Define the formatDuration function
  const formatDuration = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="searchResults-container">
      <div className="songs-container">
        {/* ---------------------------------------------------------TOP RESULT----------------------------------------------------------- */}
        <div className="top-result">
          <h2 className="search-title">Top result</h2>
          <div className="top-result-song">
            <img
              className="top-result-song-img"
              src={topResultTrack.album.images[0].url}
              alt={topResultTrack.name}
            />
            <div className="top-result-song-title">{topResultTrack.name}</div>
            <div className="top-result-song-artist">
              {topResultTrack.artists.map((artist, index) => (
                <span key={artist.id}>
                  {artist.name}
                  {index < topResultTrack.artists.length - 1 && ","}
                </span>
              ))}
              <button className="top-result-arrow-btn ">&#9658;</button>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------SONGS---------------------------------------------------------------- */}
        <div className="artist-songs">
          <h2 className="search-title">Songs</h2>
          <div className="songs-list">
            {/* Display only the first 4 songs */}
            {topTracks.slice(1, 5).map((song) => (
              <div key={song.id} className="song-container">
                {/* Song Image */}
                <div className="left-side-of-song-container">
                  {song.album.images && song.album.images.length > 0 && (
                    <img
                      className="list-song-img"
                      src={song.album.images[0].url}
                      alt={song.name}
                    />
                  )}

                  {/* Song Details */}
                  <div className="song-details">
                    <h3 className="song-title">{song.name}</h3>
                    <p className="song-artists">
                      {song.artists.map((artist, index) => (
                        <span key={artist.id}>
                          {artist.name}
                          {index < song.artists.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Song Duration */}
                <div className="song-duration">
                  {formatDuration(song.duration_ms)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------------ALBUMS---------------------------------------------------------- */}
      <div className="albums-container">
        <h2 className="search-title">Albums</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
      
          {searchData.returnedAlbums.slice(0, 6).map((album, i) => (
            <div className="col" key={i}>
              <div className="card">
                {/* Display the first image if it exists */}
                {album.images && album.images.length > 0 && (
                  <img
                    src={album.images[0].url}
                    className="card-img"
                    alt={album.name}
                  />
                )}
                <div className="card-body">
                  {/* Display the album name */}
                  <h5 className="card-title">{album.name}</h5>
                  <p className="card-info">
                    {new Date(album.release_date).getFullYear()} &#8226;
                    {album.artists[0].name}
                  </p>
                  <button className="search-arrow-btn ">&#9658;</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
