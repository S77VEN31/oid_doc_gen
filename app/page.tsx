// Components
'use client';
import './Home.style.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileCircleXmark,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import SearchBar from './components/Inputs/SearchBar/SearchBar';
import OIDTable from './components/Tables/OIDTable/OIDTable';
import ModalDisplayer from './components/ModalLayout/ModalDisplayer/ModalDisplayer';
import DetailModal from './components/ModalLayout/DetailModal/DetailModal';
import search from './utils/search';
import fetchVendors from './utils/vendors';
import Filter from './components/Inputs/Filter/Filter';
export default function Home(): JSX.Element {
  const [data, setData] = useState(null);
  const [modalData, setModalData] = useState({});
  const [modal, setModal] = useState(false);
  const [vendors, setVendors] = useState<string[]>([]);
  const [filtroActual, setFiltroActual] = useState<string>('');

  useEffect(() => {
    async function fetchAndSetVendors(): Promise<void> {
      setVendors(await getVendors());
    }
    fetchAndSetVendors();
  }, []);

  const handleFiltroCambiado = (nuevaMarca: string): void => {
    setFiltroActual(nuevaMarca);
    // Additional actions based on the new filter can be performed here
  };
  const getVendors = async (): Promise<string[]> => {
    return fetchVendors()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const vendorNames: string[] = Object.values(data);
        return vendorNames;
      })
      .catch((error) => {
        console.log(error);
        return [''];
      });
  };

  const searchTerm = async (term) => {
    return search(term)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="HOME-PAGE">
      <SearchBar setData={setData} handleOnClick={searchTerm} />
      <Filter marcas={vendors} onFiltroCambiado={handleFiltroCambiado} />
      <div className="main-container">
        {data ? (
          <OIDTable
            data={data}
            setModal={setModal}
            setModalData={setModalData}
          />
        ) : (
          <div className="null-content-container">
            <div className="null-content">
              <p>Use the search bar to find specific MIB modules</p>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
        )}
      </div>
      {modal ? (
        <ModalDisplayer setModal={setModal}>
          <DetailModal data={modalData} />
        </ModalDisplayer>
      ) : null}
    </div>
  );
}
