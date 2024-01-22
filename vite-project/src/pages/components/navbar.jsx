import React, { useState, useEffect} from "react";
import { FaUser, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Sidebar from "./sidebar";
import "./navbar.css";
import SearchForm from "../Search/SearchForm";
import { useNavigate, useLocation } from "react-router-dom";
import { getAccessToken } from "../../Spotify Api/TokenForLibrary"; 
import { useUser } from "../../context/UserContext";
import { DropdownProfile } from "./DropdownProfile";

const Navbar = ({ onSearchData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const spotifyAccessToken = getAccessToken();
  const { user, setUserData } = useUser();
  console.log("User Display Name:", user.display_name);

  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [openProfile,setOpenProfile]=useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth > 768) {
      navigate(1);
    } else {
      setDisplaySidebar(!displaySidebar);
    }
  };

  const handleClearButtonClick = () => {
    setDisplaySidebar(false);
  };

  useEffect(() => {
    const fetchSpotifyUserData = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Error fetching Spotify user data");
        }
  
        const userData = await response.json();
        setUserData(userData.display_name, userData.id);
  
        // Store user data in local storage
        localStorage.setItem('spotifyUserData', JSON.stringify({
          display_name: userData.display_name,
          id: userData.id,
        }));
      } catch (error) {
        console.error("Error fetching Spotify user data:", error);
      }
    };
  
    // Check if user data is available in local storage
    const storedUserData = localStorage.getItem('spotifyUserData');
  
    if (!user.display_name && !user.id && storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData.display_name, parsedUserData.id);
    } else if (!user.display_name && !user.id) {
      // Fetch user data if not available in local storage
      fetchSpotifyUserData();
    }
  }, [spotifyAccessToken, setUserData, user.display_name, user.id]);
  
 const toggleDropdown=()=>{
  setShowDropdown(!showDropdown)
 }
  return (
    <nav className="navbar bg-body-tertiary navbar-expand-lg">
      <div className="left-section-navbar container-fluid">
        {/* Toggle Sidebar Buttons */}
        <div className={`arrow-buttons ${displaySidebar ? "show" : ""}`}>
          <FaArrowLeft className="arrow-icon-left" onClick={goBack} />
          <FaArrowRight className="arrow-icon-right" onClick={goForward} />
        </div>

        {/* SearchForm if on search page */}
        {location.pathname === "/search" && (
          <SearchForm onSearchData={onSearchData} />
        )}
      </div>

      {/* User Info */}
    
      <div className="user-info"  onClick={()=>setOpenProfile((prev)=>!prev)}>
        <FaUser className="user-icon" />
        <span className="username">{user.display_name}</span>
      </div>

      {openProfile &&( <DropdownProfile/>)}    

      {/* Conditional Rendering of Sidebar */}
      {displaySidebar && (
        <Sidebar
          show={displaySidebar}
          onClearButtonClick={handleClearButtonClick}
        />
      )}
    </nav>
  );
};

export default Navbar;
