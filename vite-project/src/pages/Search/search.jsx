import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "./search.css";
import SearchResults from "./searchResults";
import SearchBody from "./search-body";

const Search = () => {
  const [searchData, setSearchData] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearchData = (returnedAlbums) => {
    console.log("Data received in handleSearchData:", returnedAlbums);
    setSearchData(returnedAlbums);
    setShowSearchResults(true);
  };

  useEffect(() => {
    // This code will run after searchData has been updated
    console.log("Current searchData state:", searchData);
  }, [searchData]);

  return (
    <div className="components">
      <div className="sidebar-section">
        <Sidebar />
      </div>
      <div className="body-section">
        <Navbar onSearchData={handleSearchData} />
        {/* <SearchBody /> */}
        {showSearchResults ? (
          <SearchResults searchData={searchData} />
        ) : (
          <SearchBody />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Search;
