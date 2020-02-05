import React, { useContext } from 'react';
import { CTX } from '../../../Store/Store';

const SortingFilter = () => {
  const [store, dispatch] = useContext(CTX);

  const { sortBy } = store;
  const handleChange = e => {
    const { name, value } = e.target;

    dispatch({
      type: 'CHANGE_SORTING',
      payload: { ...sortBy, [name]: value }
    });
  };

  return (
    <div>
      <select
        className="form-control mb-5"
        onChange={handleChange}
        value={sortBy.type}
        name="type"
      >
        <option value="priority">Prioridad</option>
        <option value="executionDate">Fecha de ejecución</option>
        <option value="dateRegistered">Fecha de creación</option>
      </select>
      <select
        className="form-control"
        onChange={handleChange}
        value={sortBy.finished}
        name="finished"
      >
        <option value="none">Todos</option>
        <option value={true}>Realizados</option>
        <option value={false}>Pendientes</option>
      </select>
    </div>
  );
};

export default SortingFilter;
