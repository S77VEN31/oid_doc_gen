'use client';
// React
import React, { useState, useRef } from 'react';
// Styles
import './OIDTable.style.css';

const data = [
  { id: 1, name: 'Item 1', description: 'Description for Item 1' },
  { id: 2, name: 'Item 2', description: 'Description for Item 2' },
  { id: 3, name: 'Item 3', description: 'Description for Item 3' },
];

const OIDTable: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const tableRef = useRef(null);

  const handleRowClick = (rowId: number): void => {
    setSelectedRow(rowId);
  };

  return (
    <div className="table-with-side-menu">
      <div ref={tableRef} className="table-container">
        <table className="oid-table">
          <thead>
            <tr>
              <th>Resultados</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                className={`row ${selectedRow === item.id && 'active'}`}
                key={item.id}
                onClick={() => handleRowClick(item.id)}
              >
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OIDTable;
