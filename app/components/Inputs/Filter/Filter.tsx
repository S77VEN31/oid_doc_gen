// React
import React, { useState, ChangeEvent } from 'react';
// Styles
import './Filter.styles.css';

interface FilterProps {
  vendors: string[];
  setVendor: (vendor: string) => void;
}

const Filter: React.FC<FilterProps> = ({ vendors, setVendor }) => {
  const [text, setText] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  const options = vendors.filter((vendor) =>
    vendor.toLowerCase().includes(text.toLowerCase()),
  );

  const handleChangeText = (event: ChangeEvent<HTMLInputElement>): void => {
    const newText = event.target.value;
    setText(newText);
    setFilter('');
    const first = options.length > 0 ? options[0] : '';
    setFilter(first);
    setVendor(first);
  };

  const handleSelectVendor = (vendor: string): void => {
    setFilter(vendor);
    setVendor(vendor);
  };

  return (
    <div className="filter-container">
      <div className="filter-input-container">
        <input
          type="text"
          className="filter-input"
          placeholder="Buscar vendor..."
          value={text}
          onChange={handleChangeText}
        />
      </div>
      <select
        className="filter-dropdown"
        value={filter}
        onChange={(event) => handleSelectVendor(event.target.value)}
      >
        <option value="">All vendors</option>
        {options.map((vendor) => (
          <option key={vendor} value={vendor}>
            {vendor}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Filter;
