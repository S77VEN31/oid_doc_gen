'use client';
// React
import React from 'react';
// Style
import './DropdownTable.style.css';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
// Components
import IconButton from '../../Buttons/IconButton/IconButton';

interface TreeNode {
  id?: number;
  name: string;
  oid: string;
  class: string;
  children: TreeNode[];
}

interface DropdownTableProps {
  treeData: TreeNode[];
}

const DropdownTable: React.FC<DropdownTableProps> = ({ treeData }) => {
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
        {treeData.map((item) => (
          <TableRow key={item.oid} item={item} />
        ))}
      </tbody>
    </table>
  );
};

interface TableRowProps {
  item: TreeNode;
}

const TableRow: React.FC<TableRowProps> = ({ item }) => {
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
                    <FontAwesomeIcon icon={faAngleUp} />
                  ) : (
                    <FontAwesomeIcon icon={faAngleDown} />
                  )
                }
                handleOnClick={toggleExpansion}
              />
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
