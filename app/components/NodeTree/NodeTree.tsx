'use client';
// React
import React, { useState, useEffect } from 'react';

import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
// Styles
import './styles.css';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// Components
import IconButton from '../Buttons/IconButton/IconButton';
// Data
import rootNode from './data';

const DEFAULT_DEPTH = 3;
const cloneWithDepth = (object, depth = DEFAULT_DEPTH) => {
  if (depth === -1) return undefined;
  if (typeof object !== 'object') return object;

  if (Array.isArray(object)) {
    return object
      .map((val) => cloneWithDepth(val, depth - 1))
      .filter((val) => val !== undefined);
  }

  const clone = {};

  for (const key in object) {
    if (typeof object[key] === 'object' && depth - 1 === -1) {
      continue;
    }

    const clonedValue = cloneWithDepth(object[key], depth - 1);

    if (clonedValue !== undefined) {
      clone[key] = clonedValue;
    }
  }

  return clone;
};

const findNode = (key, node = rootNode, parentPath = []) => {
  const path = [...parentPath, node.name];

  if (node.name === key) {
    return { node: cloneWithDepth(node), path };
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      const found = findNode(key, child, path);

      if (found) return found;
    }
  }
};

export default function NodeTree() {
  const [data, setData] = useState(cloneWithDepth(rootNode));
  const [path, setPath] = useState([rootNode.name]);

  const changeNode = ({ node, path }) => {
    setPath(path);
    setData(node);
  };

  const handleClick = (_, key) => {
    const foundNode = findNode(key);
    if (foundNode) {
      changeNode(foundNode);
    }
  };

  const goBack = () => {
    if (path.length <= 1) {
      // Estás en el nodo raíz, no hay nodos anteriores
      return;
    }

    const newPath = path.slice(0, -1); // Eliminar el último nodo del array

    // Encontrar el nodo correspondiente al nuevo path
    const foundNode = findNode(newPath[newPath.length - 1]);

    if (foundNode) {
      changeNode(foundNode);
      setPath(newPath);
    }
  };

  const getContainerDimensions = () => {
    const container = document.getElementById('tree-container'); // Make sure you set an id="tree-container" to the parent container
    if (container) {
      return {
        width: container.offsetWidth,
        height: container.offsetHeight,
      };
    }
    return { width: 600, height: 400 }; // Fallback dimensions if the container is not found
  };

  const [dimensions, setDimensions] = useState(getContainerDimensions());

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getContainerDimensions());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      id="tree-container"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'auto',
      }}
    >
      <div style={{ marginLeft: 30, display: 'flex', gap: 8 }}>
        <IconButton
          handleOnClick={goBack}
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
        />

        {path.map((pathItem, index) => (
          <IconButton
            buttonText={pathItem}
            key={index}
            handleOnClick={goBack}
          />
        ))}
      </div>

      <Tree
        animated
        data={data}
        width={dimensions.width}
        height={dimensions.height}
        nodeRadius={10}
        svgProps={{
          style: {
            backgroundColor: 'lightgray',
            flex: 1,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
        gProps={{ className: 'node', onClick: handleClick }}
        margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
      />
    </div>
  );
}
