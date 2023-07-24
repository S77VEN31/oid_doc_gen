'use client';
import React, { useState, useEffect } from 'react';
import './OIDTable.style.css'; // Create this CSS file for styling
import NodeTree from '../../NodeTree/NodeTree';
const OIDTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const data = [
    { id: 1, name: 'Item 1', description: 'Description for Item 1' },
    { id: 2, name: 'Item 2', description: 'Description for Item 2' },
    { id: 3, name: 'Item 3', description: 'Description for Item 3' },
    // Add more data as needed
  ];

  useEffect(() => {
    let animationTimeout;

    if (menuVisible) {
      // Wait for the animation to complete (0.7s) before rendering the side menu content
      animationTimeout = setTimeout(() => {
        setAnimationComplete(true);
      }, 700);
    } else {
      // If the menu is not visible, reset the animation state
      setAnimationComplete(false);
    }

    return () => clearTimeout(animationTimeout);
  }, [menuVisible]);

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
              <tr key={item.id} onClick={() => handleRowClick(item.id)}>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {menuVisible && animationComplete && (
        <div className={`side-menu ${menuVisible ? 'side-menu-visible' : ''}`}>
          <NodeTree />
        </div>
      )}
    </div>
  );
};
// <h2>Content for Item {selectedRow}</h2>
//  <p>{data.find((item) => item.id === selectedRow)?.description}</p>
export default OIDTable;
