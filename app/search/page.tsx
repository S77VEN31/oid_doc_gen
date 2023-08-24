'use client';
import Filter from '../components/Inputs/Filter/Filter';
import React, { useEffect, useState } from 'react';
import fetchVendors from '../utils/vendors';

// Use async function to fetch vendors
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

export default function Search(): JSX.Element {
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

  return (
    <div>
      <Filter marcas={vendors} onFiltroCambiado={handleFiltroCambiado} />
    </div>
  );
}
