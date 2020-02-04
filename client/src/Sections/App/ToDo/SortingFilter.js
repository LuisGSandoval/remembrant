import React, { useContext } from 'react';
import { CTX } from '../../../Store/Store';

const SortingFilter = () => {
  const [store, dispatch] = useContext(CTX);

  const handleChange = e => {
    dispatch({
      type: 'CHANGE_SORTING',
      payload: e.target.value
    });
  };

  return (
    <div>
      <select onChange={handleChange} value={store}>
        <option value="all">Todos</option>
        <option value="priority">Prioridad</option>
        <option value="date">Fecha</option>
        <option value="finished">Realizados</option>
        <option value="pending">Pendientes</option>
      </select>
    </div>
  );
};

export default SortingFilter;
