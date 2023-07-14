'use client';
// React
import { useState } from 'react';
// Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// Styles
import './SearchBar.style.css';

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setInputValue(event.target.value);
  };

  return (
    <div className="inputGroup">
      <input
        type="text"
        onChange={handleInputChange}
        value={inputValue}
        required
        autoComplete="off"
      />
      {inputValue ? (
        <button className="search-button">
          <div className="glass-and-search">
            <FontAwesomeIcon icon={faSearch} />
            Search
          </div>
        </button>
      ) : (
        <label htmlFor="name">
          <div className="glass-and-search">
            <FontAwesomeIcon icon={faSearch} />
            Search
          </div>
        </label>
      )}
    </div>
  );
};
export default SearchBar;
