import React, { useContext, useEffect, useState } from 'react';
import { CTX } from '../../../Store/Store';
import EVolNavbar from '../../../Components/EVolNavbar';
import ToDoCreateButton from './ToDoCreateButton';
import ToDoList from './ToDoList';

const Notes = () => {
  const [store, dispatch] = useContext(CTX);

  return (
    <div>
      <EVolNavbar />

      <div className="container">
        <h3 className="mt-3">Notas</h3>
        <hr />
        <ToDoCreateButton />
        <button
          onClick={() =>
            dispatch({
              type: 'MODAL_TOGGLE',
              payload: { section: 'filters', open: true }
            })
          }
        >
          Filters
        </button>
        <ToDoList />
      </div>
    </div>
  );
};

export default Notes;
