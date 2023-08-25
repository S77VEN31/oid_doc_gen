// Components
'use client';
import './Home.style.css';
import { useState } from 'react';
//import NodeTree from './components/NodeTree/NodeTree';
import SearchBar from './components/Inputs/SearchBar/SearchBar';
import OIDTable from './components/Tables/OIDTable/OIDTable';
import ModalDisplayer from './components/ModalLayout/ModalDisplayer/ModalDisplayer';
import DetailModal from './components/ModalLayout/DetailModal/DetailModal';

export default function Home(): JSX.Element {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  return (
    <div className="HOME-PAGE">
      <SearchBar setData={setData} />
      <div className="main-container">
        <OIDTable data={[...data, ...data]} setModal={setModal} />
      </div>
      {modal ? (
        <ModalDisplayer setModal={setModal}>
          <DetailModal data={data} />
        </ModalDisplayer>
      ) : null}
    </div>
  );
}
