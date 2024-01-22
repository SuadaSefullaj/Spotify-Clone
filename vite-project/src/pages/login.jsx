import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ClearIcon from "@mui/icons-material/Clear";
import "./login.css";
import Components from "./Home/home";
import { useUser } from "../context/UserContext";
import { useContext } from "react";
import Home from "./Home/home";

const LoginForm = () => {
  const navigate = useNavigate();
  const { updateUsername } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if username or password is empty
    if (!username.trim() || !password.trim()) {
      // Fields are empty, don't proceed with the submission
      return;
    }

    // Fields are not empty, update username and navigate
    updateUsername(username);
    navigate("/home");
  };
  const handleChange = (event) => {
    setUsername(event.target.value);
    console.log("Username updated:", event.target.value);
  };

  const clearUsername = () => {
    setUsername("");
  };
  console.log("Render LoginForm");
  const isUsernameEmpty = username === "";
  const isPasswordEmpty = password === "";

  return (
    <div className="login">
      <img
        className="spotify-logo"
        src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
        alt="Spotify logo"
      />
      <form onSubmit={handleSubmit}>
        <div className="loginForm">
          <label htmlFor="username" style={{ textAlign: "start" }}>
            Username:
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            {username && (
              <ClearIcon
                onClick={clearUsername}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#757575",
                }}
              />
            )}
            <AccountCircleIcon
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#757575",
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" style={{ textAlign: "start" }}>
            Password:
          </label>
          <div style={{ position: "relative" }}>
            <VpnKeyIcon
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#757575",
              }}
            />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div>
          <button type="submit" className="submit-btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
