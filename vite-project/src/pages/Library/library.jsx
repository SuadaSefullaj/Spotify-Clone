import React from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import LibraryBody from "./library-body";
import "./library.css";

const Library = () => (
  <div className="components">
    <div className="sidebar-section">
      <Sidebar />
    </div>
    <div className="body-section">
      <div>
        <Navbar />
      </div>
      <div>
        <LibraryBody />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  </div>
);

export default Library;
