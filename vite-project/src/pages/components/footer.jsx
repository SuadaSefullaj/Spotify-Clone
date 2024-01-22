import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="links">
        <div className="column">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="https://www.spotify.com/bg-en/about-us/contact/">
                About
              </a>
            </li>
            <li>
              <a href="https://www.lifeatspotify.com/">Jobs</a>
            </li>
            <li>
              <a href="https://newsroom.spotify.com/">For Records</a>
            </li>
          </ul>
        </div>
        <div className="column">
          <h4>Communities</h4>
          <ul>
            <li>
              <a href="https://artists.spotify.com/home">For Artists</a>
            </li>
            <li>
              <a href="https://developer.spotify.com/">Developers</a>
            </li>
            <li>
              <a href="https://ads.spotify.com/en-US/">Advertising</a>
            </li>
            <li>
              <a href="/https://investors.spotify.com/home/default.aspx">
                Investors
              </a>
            </li>
            <li>
              <a href="https://spotifyforvendors.com/">Vendors</a>
            </li>
          </ul>
        </div>
        <div className="column">
          <h4>Useful Links</h4>
          <ul>
            <li>
              <a href="https://support.spotify.com/bg-en/">Support</a>
            </li>
            <li>
              <a href="https://www.spotify.com/bg-en/free/">Free Mobile App</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="social-media">
        <div className="social-icons">
          <a href="https://www.instagram.com/spotify/">
            <img src="/src/icons/instagram.png" alt="Instagram" />
            {/* TIP: use "/src/icons/instagram.png" instead of "src/icons/instagram.png" when you use layout using root relative path  */}
          </a>
          <a href="https://twitter.com/spotify">
            <img src="/src/icons/twitter.png" alt="Twitter" />
          </a>
          <a href="https://www.facebook.com/Spotify">
            <img src="/src/icons/facebook.png" alt="Facebook" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
