// Components
import NodeTree from './components/NodeTree/NodeTree';
import SearchBar from './components/Inputs/SearchBar/SearchBar';
import OIDTable from './components/Tables/OIDTable/OIDTable';
export default function Home(): JSX.Element {
  return (
    <div style={{ padding: 30 }}>
      <SearchBar />
      <OIDTable />
    </div>
  );
}
