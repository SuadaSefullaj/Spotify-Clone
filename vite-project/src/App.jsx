import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spotify from "./pages/spotify";
import Login from "./pages/login";
import Home from "./pages/Home/home";
import Search from "./pages/Search/search";
import Library from "./pages/Library/library";
import { UserProvider } from "./context/UserContext";
import { useUser } from "./context/UserContext";
import PlaylistTracks from "./pages/Home/playlistsTrack";
import { getTokenFromUrl } from "./Spotify Api/SpotifyLogin";
import SpotifyWebApi from "spotify-web-api-js";
import { useNavigate } from "react-router-dom";

function App() {
 //ding setUserData as a dependency ensures that your effect will only run when setUserData changes, preventing potential issues.
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="" element={<App/>}/>
          <Route path="/spotify" element={<Spotify />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="/home" element={<HomeBody />} /> */}
          <Route path="/home/*" element={<Home />} />
          <Route path="/playlist/:playlistId" element={<PlaylistTracks />} />
          <Route path="search" element={<Search />} />
          <Route path="library" element={<Library />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
