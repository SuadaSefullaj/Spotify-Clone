import React from "react";
import HomeBody from "./home-body";
import { getTokenFromUrl } from "../../Spotify Api/SpotifyLogin";
import SpotifyWebApi from "spotify-web-api-js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import "./home.css";
import HomeLayout from "../../layouts/HomeLayout";

const Home = () => {
  const [spotifyToken, setSpotifyToken] = useState("");
  const { setUserData } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    const _spotifyToken = getTokenFromUrl().access_token;

    // We don't want it in the URI
    window.location.hash = "";

    if (_spotifyToken) {
      
      return () => {
        setSpotifyToken(_spotifyToken);

        const Spotify = new SpotifyWebApi();
        Spotify.setAccessToken(_spotifyToken);
      
        Spotify.getMe()
          .then((user) => {
            console.log("User:", user);
            // Update user information in the context
            console.log("User ID before setUserData:", user.id);
        setUserData(user.display_name, user.id, _spotifyToken);
        console.log("User ID after setUserData:", user.id);
      
          })
          .catch((error) => {
            console.error("Error fetching user:", error);
          });
      }
    }
  }, [setUserData]); 
  return (
    <HomeLayout>
      <HomeBody></HomeBody>
    </HomeLayout>
  );
};

export default Home;
