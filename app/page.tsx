// Components
'use client';
import './Home.style.css';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './components/Inputs/SearchBar/SearchBar';
import OIDTable from './components/Tables/OIDTable/OIDTable';
import ModalDisplayer from './components/ModalLayout/ModalDisplayer/ModalDisplayer';
import DetailModal from './components/ModalLayout/DetailModal/DetailModal';
import search from './utils/search';
import fetchVendors from './utils/vendors';
import Filter from './components/Inputs/Filter/Filter';
import IconButton from './components/Buttons/IconButton/IconButton';
export default function Home(): JSX.Element {
  const [data, setData] = useState(null);
  const [modalData, setModalData] = useState({});
  const [modal, setModal] = useState(false);
  const [vendors, setVendors] = useState<string[]>([]);
  const [vendor, setVendor] = useState<number>(0);
  const [term, setTerm] = useState<string>('');
  const [local, setLocal] = useState<boolean>(false);

  useEffect(() => {
    async function fetchAndSetVendors(): Promise<void> {
      setVendors(await getVendors());
    }
    fetchAndSetVendors();
  }, []);

  const searchInMIBCall = useCallback(async () => {
    await searchInMIB(term, vendor, local);
  }, [vendor, term, local]);

  useEffect(() => {
    searchInMIBCall();
  }, [searchInMIBCall]);

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

  const searchInMIB = async (term, vendor, local) => {
    return search(term, vendor, local)
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
      <SearchBar setData={setData} setTerm={setTerm} />
      <div className="filters-container">
        <Filter vendors={vendors} setVendor={setVendor} vendor={vendor} />
        <IconButton
          disabled={term === '' ? true : false}
          handleOnClick={() => setLocal(!local)}
          buttonText={local ? 'Local: yes' : 'Local: no'}
        ></IconButton>
      </div>

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
