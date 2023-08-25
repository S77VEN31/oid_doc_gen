'use client';
// React
import React, { useState, useRef } from 'react';
// Styles
import './OIDTable.style.css';

const OIDTable: React.FC = ({ data, setModal, setModalData }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const tableRef = useRef(null);

  const handleRowClick = (index: number): void => {
    setSelectedRow(index);
    setModalData(data[index]);
    setModal(true);
  };

  return (
    <div className="table-with-side-menu render-animation ">
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
                    <div>
                      <strong>NAME: </strong>
                      {item.name}
                    </div>
                    <div>
                      <strong>OID: </strong>
                      {item.oid}
                    </div>
                    <div>
                      <strong>TYPE: </strong>
                      {item.nodetype}
                    </div>
                  </div>
                  <div className="row-description">
                    <div>
                      <strong>DESCRIPTION: </strong>
                      {item.description}
                    </div>
                  </div>
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
