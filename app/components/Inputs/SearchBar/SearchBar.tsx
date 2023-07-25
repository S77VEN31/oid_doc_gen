'use client';
// React
import { useState } from 'react';
// Components
import IconButton from '../../Buttons/IconButton/IconButton';
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
        className={`input-container ${inputValue && 'input-container-small'}`}
        type="text"
        onChange={handleInputChange}
        value={inputValue}
        required
        autoComplete="off"
      />
      {inputValue ? (
        <IconButton
          handleOnClick={() => console.log(inputValue)}
          buttonText="Search"
          icon={<FontAwesomeIcon icon={faSearch} />}
        />
      ) : (
        <label className="search-label" htmlFor="name">
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
