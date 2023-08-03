'use client';
// React
import React from 'react';
// Styles
import './DropdownTable.style.css';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
// Components
import IconButton from '../../Buttons/IconButton/IconButton';

const DropdownTable = ({ data }) => {
  return (
    <table className="main-dropdowntable">
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
          <div className="row-item dropdown-button-and-name-container">
            {item.children.length > 0 && (
              <IconButton
                buttonClassname={`dropdown-button ${
                  isExpanded && 'dropdown-button-active'
                }`}
                icon={
                  isExpanded ? (
                    <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                  ) : (
                    <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
                  )
                }
                handleOnClick={toggleExpansion}
              ></IconButton>
            )}
            {item.name}
          </div>
        </td>
        <td>
          <div className="row-item">{item.oid}</div>
        </td>
        <td>
          <div className="row-item">{item.class}</div>
        </td>
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
