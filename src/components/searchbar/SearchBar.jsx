import React from "react";
import './SearchBar.css';

const SearchBar = ({value, handleChange}) => {
    return (
        <div className="search__bar">
            <input type="text" value={value} onChange={handleChange} placeholder="Explorar"/>
        </div>
    );
}

export default SearchBar;