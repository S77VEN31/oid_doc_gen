'use client';
// React
import React, { useState, useRef } from 'react';
// Styles
import './OIDTable.style.css';

const OIDTable: React.FC = ({ data, setModal }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const tableRef = useRef(null);

  const handleRowClick = (rowId: number): void => {
    setSelectedRow(rowId);
    setModal(true);
  };

  return (
    <div className="table-with-side-menu">
      <div ref={tableRef} className="table-container">
        <table className="oid-table">
          <tbody className="oid-table-body">
            {data.map((item, index) => (
              <tr
                className={`row ${selectedRow === index && 'active'}`}
                key={item.id}
                onClick={() => handleRowClick(index)}
              >
                <td className="row-container">
                  <div className="row-name-oid">
                    <div>{item.name}</div>
                    <div>{item.oid}</div>
                  </div>
                  <div>{item.description}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OIDTable;
