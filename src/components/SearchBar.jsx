import React from 'react';
import { IoSearch } from 'react-icons/io5';
import '../styles/searchBar.css';

export default function SearchBar() {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <IoSearch size={20} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search tools, pressure washers..." 
          className="search-input"
        />
      </div>
    </div>
  );
}
