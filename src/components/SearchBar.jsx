import React from "react";
import { IoSearch } from "react-icons/io5";
import { useSearch } from "../context/SearchContext";
import "../styles/searchBar.css";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <IoSearch size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search tools..."
          className="search-input"
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
