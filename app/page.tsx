import Tree from './components/Tree/Tree';
export default function Home(): JSX.Element {
  const mibData = [
    {
      id: 0,
      name: 'Root Node',
      children: [
        {
          id: 1,
          name: 'Child Node 1',
          children: [
            {
              id: 2,
              name: 'Child Node 2',
              children: [],
            },
            {
              id: 3,
              name: 'Child Node 3',
              children: [],
            },
          ],
        },
        {
          id: 4,
          name: 'Child Node 4',
          children: [
            {
              id: 5,
              name: 'Child Node 5',
              children: [],
            },
            {
              id: 6,
              name: 'Child Node 5',
              children: [],
            },
          ],
        },
      ],
    },
  ];
  return (
    <div>
      <h1>MIB Tree</h1>
      <Tree data={mibData} />
    </div>
  );
}
