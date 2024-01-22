import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./SearchForm.css";
import axios from "axios";
import SearchResults from "./searchResults";
import getAccessToken from "../../Spotify Api/spotifyAuth";

const SearchForm = ({ onSearchData }) => {
  console.log("SearchForm is rendering");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    console.log("useEffect is running");

    // Use the utility function to get the access token
    getAccessToken().then((token) => setAccessToken(token));
  }, []);
  //SEARCH

  async function handleSearch() {
    console.log("Search for " + searchText);

    //Get request using search to get the Artist ID
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken, // space after 'Bearer '
      },
    };
    var artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchText + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    console.log("Artist ID is " + artistID);

    //Get request with Artist ID grab all the albums from the artist
    var returnedAlbums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums" +
        "?include_groups=album&market=US&limit=50",
      searchParameters // include headers with access token
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data.items;
        // setAlbums(data.items);
      });

    setAlbums(returnedAlbums);
    // console.log("Returned albums:", returnedAlbums);

    //Displays those albums to the user
    console.log(albums);

    // Get request with Artist ID to grab top tracks
    const topTracksResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=US`,
      searchParameters
    );
    const topTracksData = await topTracksResponse.json();
    console.log("Top Tracks:", topTracksData.tracks);

    // Get request with Artist ID to grab top artists (related artists)
    const relatedArtistsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/related-artists`,
      searchParameters
    );
    const relatedArtistsData = await relatedArtistsResponse.json();
    console.log("Related Artists:", relatedArtistsData.artists);

    // Pass the fetched data to the parent component
    onSearchData({
      returnedAlbums,
      topTracks: topTracksData.tracks,
      relatedArtists: relatedArtistsData.artists,
    });
    //onSearchData(returnedAlbums);
  }

  const handleClearClick = () => {
    setSearchText("");
    setSearchResults([]);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Pressed enter");
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="search-icon-container">
        <FaSearch className="search-icon" />
      </div>

      <input
        type="text"
        className="search-input"
        placeholder="What do you want to listen to?"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      {searchText && (
        <div className="clear-icon-container" onClick={handleClearClick}>
          <FaTimes className="clear-icon" />
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="search-results">
          <ul>
            {searchResults.map((track) => (
              <li key={track.id}>
                {track.name} - {track.artists[0].name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
