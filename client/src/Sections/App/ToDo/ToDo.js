import React, { useContext } from 'react';
import { CTX } from '../../../Store/Store';
import EVolNavbar from '../../../Components/EVolNavbar';
import ToDoCreateButton from './ToDoCreateButton';
import ToDoList from './ToDoList';

const Notes = () => {
  const [, dispatch] = useContext(CTX);

  return (
    <div>
      <EVolNavbar />

      <div className="container">
        <h3 className="mt-3">Notas</h3>
        <hr />
        <ToDoCreateButton />
        <button
          title="filter"
          className="btn btn-dark"
          onClick={() =>
            dispatch({
              type: 'MODAL_TOGGLE',
              payload: { section: 'filters', open: true },
            })
          }
        >
          <i className="fa fa-filter" />
        </button>
        <ToDoList />
      </div>
    </div>
  );
};

export default Notes;
