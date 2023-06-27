const TreeNode = ({ node }) => (
  <li>
    <div className="node">{node.name}</div>
    {node.children && (
      <ul className="subtree">
        {node.children.map((childNode) => (
          <TreeNode key={childNode.id} node={childNode} />
        ))}
      </ul>
    )}
  </li>
);
export default TreeNode;
