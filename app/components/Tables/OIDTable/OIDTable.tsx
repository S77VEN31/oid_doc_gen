'use client';
import React, { useState, useRef } from 'react';
import './OIDTable.style.css'; // Create this CSS file for styling
import NodeTree from '../../NodeTree/NodeTree';
import ModalDisplayer from '../../ModalLayout/ModalDisplayer/ModalDisplayer';
import StandardModal from '../../ModalLayout/StandardModal/StandardModal';
const OIDTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [modal, setModal] = useState(false);

  const tableRef = useRef(null);
  const data = [
    { id: 1, name: 'Item 1', description: 'Description for Item 1' },
    { id: 2, name: 'Item 2', description: 'Description for Item 2' },
    { id: 3, name: 'Item 3', description: 'Description for Item 3' },
    // Add more data as needed
  ];

  const handleRowClick = (rowId) => {
    setSelectedRow(rowId);
    setModal(true);
  };

  return (
    <div className="table-with-side-menu">
      <div ref={tableRef} className="table-container">
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

      {modal && (
        <ModalDisplayer setModal={setModal}>
          <StandardModal>
            <NodeTree />
          </StandardModal>
        </ModalDisplayer>
      )}
    </div>
  );
};
// <h2>Content for Item {selectedRow}</h2>
//<p>{data.find((item) => item.id === selectedRow)?.description}</p>
export default OIDTable;
