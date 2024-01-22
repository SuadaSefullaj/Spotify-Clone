import React from "react";
import "./DropdownProfile.css";
import { useNavigate } from "react-router-dom";

export const DropdownProfile = () => {
  const navigate=useNavigate();

  const handleLogout=()=>{
    navigate("/spotify")
  }
  return (
    <div className="flex flex-col dropdownProfile">
      <ul className="flex flex-col">
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  )
}
