import TreeNode from '../TreeNode/TreeNode';
const Tree = ({ data }) => (
  <ul className="tree">
    {data.map((node) => (
      <TreeNode key={node.id} node={node} />
    ))}
  </ul>
);

export default Tree;
