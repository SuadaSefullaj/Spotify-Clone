import React, { useState, useEffect } from "react";
import "./library-body.css";
import { FaClock } from "react-icons/fa";

const LibraryBody = () => {
  return (
    <div className="LibraryBody">
      <div className="playlist-library">
        <img
          src="src/icons/liked-songs.png"
          alt=""
          className="library-playlist-icon"
        />
        <div className="playlist-info">
          <h6 className="playlist-on-top">Playlist</h6>
          <h4 className="playlist-name">Liked Songs</h4>
        </div>
      </div>
      <div>
        <table className="table">
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
                Data added
              </th>
              <th scope="col" style={{ textAlign: "start" }}>
                <FaClock />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                <div className="track-container">
                  <img src="src/images/majk.png" className="song-img" alt="" />
                  <div className="song-info">
                    <h4 className="song-name">Dashni</h4>
                    <h6 className="singer">Majk</h6>
                  </div>
                </div>
              </td>
              <td>Dashni</td>
              <td>5 min ago</td>
              <td>3:48</td>
            </tr>

            <tr>
              <th scope="row">2</th>
              <td>
                <div className="track-container">
                  <img
                    src="src/images/TheWeeknd.png"
                    className="song-img"
                    alt=""
                  />
                  <div className="song-info">
                    <h4 className="song-name">I was never there</h4>
                    <h6 className="singer"> The Weeknd</h6>
                  </div>
                </div>
              </td>
              <td>My dear Melancholy</td>
              <td>5 min ago</td>
              <td>4:01</td>
            </tr>

            <tr>
              <th scope="row">3</th>
              <td>
                <div className="track-container">
                  <img src="src/images/hapa.png" className="song-img" alt="" />
                  <div className="song-info">
                    <h4 className="song-name">Hapa</h4>
                    <h6 className="singer">Noizy,Ylli</h6>
                  </div>
                </div>
              </td>
              <td>Hapa</td>
              <td>5 min ago</td>
              <td>3:36</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibraryBody;
