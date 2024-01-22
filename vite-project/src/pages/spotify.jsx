import { Link } from "react-router-dom";
import "./spotify.css";
import "./login";
import { loginUrl } from "../Spotify Api/SpotifyLogin";

const Spotify = () => {
  return (
    <div className="login">
      <img
        className="spotify-logo"
        src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
        alt="Spotify logo"
      />
   

<button className="loginWithSpotify">
       <a href={loginUrl} id="loginWithSpotify">LOGIN WITH SPOTIFY</a>
      </button> 
    </div>
  );
};
export default Spotify;
