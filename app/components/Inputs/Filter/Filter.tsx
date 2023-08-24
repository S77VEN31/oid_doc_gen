// React
import React, { useState, ChangeEvent } from 'react';
// Styles
import './Filter.styles.css';

interface FilterProps {
  marcas: string[];
  onFiltroCambiado: (marca: string) => void;
}

const Filter: React.FC<FilterProps> = ({ marcas, onFiltroCambiado }) => {
  const [filtro, setFiltro] = useState<string>('');
  const [marcaSeleccionada, setMarcaSeleccionada] = useState<string>('');

  const opcionesFiltradas = marcas.filter((marca) =>
    marca.toLowerCase().includes(filtro.toLowerCase()),
  );

  const handleChangeFiltro = (event: ChangeEvent<HTMLInputElement>): void => {
    const nuevoFiltro = event.target.value;
    setFiltro(nuevoFiltro);
    setMarcaSeleccionada('');
    onFiltroCambiado('');
    const primeraOpcionFiltrada =
      opcionesFiltradas.length > 0 ? opcionesFiltradas[0] : '';
    setMarcaSeleccionada(primeraOpcionFiltrada);
    onFiltroCambiado(primeraOpcionFiltrada);
  };

  const handleSeleccionarMarca = (marca: string): void => {
    setMarcaSeleccionada(marca);
    onFiltroCambiado(marca);
  };

  return (
    <div className="filter-container">
      <div className="filter-input-container">
        <input
          type="text"
          className="filter-input"
          placeholder="Buscar marca..."
          value={filtro}
          onChange={handleChangeFiltro}
        />
      </div>
      <select
        className="filter-dropdown"
        value={marcaSeleccionada}
        onChange={(event) => handleSeleccionarMarca(event.target.value)}
      >
        <option value="">Todas las marcas</option>
        {opcionesFiltradas.map((marca) => (
          <option key={marca} value={marca}>
            {marca}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Filter;
