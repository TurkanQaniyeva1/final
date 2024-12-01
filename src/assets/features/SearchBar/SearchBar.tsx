import React from "react";
import { FaSearch } from "react-icons/fa";
import "./search.css";

const SearchBar: React.FC = () => (
  <div className="search-bar">
    <FaSearch className="search-icon" />
    <input type="text" placeholder="Search store" />
  </div>
);

export default SearchBar;
