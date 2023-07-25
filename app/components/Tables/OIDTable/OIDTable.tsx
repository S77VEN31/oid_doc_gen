'use client';
import React, { useState, useEffect } from 'react';
import './OIDTable.style.css'; // Create this CSS file for styling
import NodeTree from '../../NodeTree/NodeTree';
const OIDTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const data = [
    { id: 1, name: 'Item 1', description: 'Description for Item 1' },
    { id: 2, name: 'Item 2', description: 'Description for Item 2' },
    { id: 3, name: 'Item 3', description: 'Description for Item 3' },
    // Add more data as needed
  ];

  const handleRowClick = (rowId) => {
    setSelectedRow(rowId);
    setMenuVisible(true);
  };

  const handleMenuClose = () => {
    setSelectedRow(null);
    setMenuVisible(false);
  };

  return (
    <div className="table-with-side-menu">
      <div
        className={`table-container ${
          menuVisible ? 'table-container-small' : ''
        }`}
      >
        <table>
          <thead>
            <tr>
              <th>Resultados</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                className="row"
                key={item.id}
                onClick={() => handleRowClick(item.id)}
              >
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {menuVisible && (
        <div className={'side-menu side-menu-render-animation'}>
          <button className="close-button" onClick={handleMenuClose}>
            Close Menu
          </button>
          <h2>Content for Item {selectedRow}</h2>
          <p>{data.find((item) => item.id === selectedRow)?.description}</p>
          <NodeTree />
        </div>
      )}
    </div>
  );
};

export default OIDTable;
