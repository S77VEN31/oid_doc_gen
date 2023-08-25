'use client';
// React
import { useState } from 'react';
// Styles
import './SearchBar.style.css';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// Components
import IconButton from '../../Buttons/IconButton/IconButton';

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
        placeholder="Search terms in the MIB data..."
        autoComplete="off"
      />
      {inputValue && (
        <IconButton
          buttonClassname="button-render-animation search-button"
          handleOnClick={() => console.log(inputValue)}
          buttonText="Search"
          icon={<FontAwesomeIcon icon={faSearch} />}
        />
      )}
    </div>
  );
};
export default SearchBar;
