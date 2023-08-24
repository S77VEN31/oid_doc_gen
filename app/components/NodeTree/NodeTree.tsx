'use client';
// React
import React, { useState, useEffect } from 'react';
// Styles
import './NodeTree.style.css';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// Components
// @ts-ignore
import { AnimatedTree } from 'react-tree-graph';
import IconButton from '../Buttons/IconButton/IconButton';

const DEFAULT_DEPTH = 3;
// @ts-ignore
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
      // @ts-ignore
      clone[key] = clonedValue;
    }
  }
  return clone;
};
// @ts-ignore
export default function NodeTree({ treeData }) {
  const [data, setData] = useState(cloneWithDepth(treeData));
  const [path, setPath] = useState([treeData.name]);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1);
  // @ts-ignore
  const findNode = (key, node = treeData, parentPath = []) => {
    const path = [...parentPath, node.name];
    if (node.name === key) {
      return { node: cloneWithDepth(node), path };
    }
    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        // @ts-ignore
        const found = findNode(key, child, path);
        if (found) return found;
      }
    }
  };
  // @ts-ignore
  const changeNode = ({ node, path }) => {
    setPath(path);
    setData(node);
  };
  // @ts-ignore
  const handleClick = (index, key) => {
    const foundNode = findNode(key);
    if (foundNode) {
      changeNode(foundNode);
    }
  };

  const goBack = () => {
    if (path.length <= 1) {
      return;
    }
    const newPath = path.slice(0, -1);
    const foundNode = findNode(newPath[newPath.length - 1]);
    if (foundNode) {
      changeNode(foundNode);
      setPath(newPath);
    }
  };

  const getContainerDimensions = () => {
    const container = document.getElementById('tree-container');
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
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setSelectedButtonIndex(path.length - 1);
  }, [path]);

  return (
    <div
      id="tree-container"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          minHeight: 'fit-content',
          padding: 8,
          display: 'flex',
          gap: 8,
          paddingTop: 8,
          overflowX: 'auto',
        }}
      >
        <IconButton
          handleOnClick={goBack}
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
        />

        {path.map((pathItem, index) => (
          <IconButton
            buttonText={pathItem}
            key={index}
            handleOnClick={() => handleClick(index, pathItem)}
            buttonClassname={`navigation-button ${
              selectedButtonIndex === index && 'active'
            }`}
          />
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <AnimatedTree
          animated
          data={data}
          width={dimensions.width}
          height={dimensions.height}
          nodeProps={{ r: 10 }}
          svgProps={{
            style: {
              flex: 1,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
          textProps={{
            x: -10,
            y: -20,
          }}
          gProps={{
            className: 'node',
            onClick: handleClick,
          }}
          margins={{ top: 20, bottom: 20, left: 20, right: 300 }}
        />
      </div>
    </div>
  );
}
