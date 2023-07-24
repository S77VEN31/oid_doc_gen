'use client';
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';

import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';

import './styles.css';
import rootNode from './data';

const DEFAULT_DEPTH = 5;
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

const useWindowInnerSize = () => {
  const isClient = typeof window === 'object';

  const [innerWidth, setInnerWidth] = useState(
    isClient ? window.innerWidth : 0,
  );
  const [innerHeight, setInnerHeight] = useState(
    isClient ? window.innerHeight : 0,
  );

  const handleResize = useCallback(() => {
    setInnerWidth(window.innerWidth);
    setInnerHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    if (isClient) {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (isClient) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [handleResize, isClient]);

  return {
    innerWidth,
    innerHeight,
  };
};

export default function NodeTree() {
  const [data, setData] = useState(cloneWithDepth(rootNode));
  const [path, setPath] = useState([rootNode.name]);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const { innerWidth, innerHeight } = useWindowInnerSize();
  const canvasWrapper = useRef(null);
  const setCanvasSize = useCallback(() => {
    const { clientWidth, clientHeight } = canvasWrapper.current;

    setCanvasWidth(clientWidth);
    setCanvasHeight(clientHeight);
  }, []);

  useEffect(() => {
    setCanvasSize();
  }, [setCanvasSize]);

  useLayoutEffect(() => {
    setCanvasWidth(0);
    setCanvasHeight(0);
  }, [innerWidth, innerHeight]);

  useEffect(() => {
    let isMounted = true;

    requestAnimationFrame(() => {
      if (isMounted) {
        setCanvasSize();
      }
    });

    return () => {
      isMounted = false;
    };
  }, [innerWidth, innerHeight, setCanvasSize]);

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

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <button
          style={{
            margin: '0',
            border: 'none',
            outline: 'none',
            background: 'none',
            padding: '0 0.1rem',
            textDecoration: 'underline',
            cursor: 'pointer',
            color: 'blue',
          }}
          onClick={goBack}
        >
          Back
        </button>
        {path.map((pathItem, index) => (
          <button
            key={index}
            style={{
              margin: '0',
              border: 'none',
              outline: 'none',
              background: 'none',
              padding: '0 0.1rem',
              textDecoration: 'underline',
              cursor: data.name === pathItem ? '' : 'pointer',
              color: data.name === pathItem ? 'black' : 'blue',
            }}
            onClick={() => changeNode(findNode(pathItem))}
          >
            {pathItem}
          </button>
        ))}
      </div>
      <div style={{ flexGrow: 1 }} ref={canvasWrapper}>
        <Tree
          animated
          data={data}
          width={canvasWidth}
          height={canvasHeight}
          nodeRadius={15}
          svgProps={{ style: { backgroundColor: 'lightgray' } }}
          gProps={{ className: 'node', onClick: handleClick }}
          margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
        />
      </div>
    </div>
  );
}