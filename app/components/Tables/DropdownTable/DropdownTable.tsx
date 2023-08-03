'use client';
import React from 'react';

const DropdownTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>OID</th>
          <th>Class</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <TableRow key={item.oid} item={item} />
        ))}
      </tbody>
    </table>
  );
};

const TableRow = ({ item }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <tr>
        <td>
          {item.children.length > 0 && (
            <button onClick={toggleExpansion}>
              {isExpanded ? 'Cerrar' : 'Desplegar'}
            </button>
          )}
          {item.name}
        </td>
        <td>{item.oid}</td>
        <td>{item.class}</td>
      </tr>
      {isExpanded && item.children.length > 0 && (
        <tr>
          <td colSpan={3}>
            <table>
              <tbody>
                {item.children.map((child) => (
                  <TableRow key={child.oid} item={child} />
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

export default DropdownTable;
