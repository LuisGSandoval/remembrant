import React, { useContext, useState } from 'react';
import { CTX } from '../../../Store/Store';
import Toggle from 'react-toggle';
import './ToDoStyles.css';
import { getNotes } from '../../../Actions/NotesActions';

const Buttons = () => {
  const [, dispatch] = useContext(CTX);
  const [finishedTasksFilter, setFinishedTasksFilter] = useState(true);

  const getAllNotes = () => {
    setFinishedTasksFilter(!finishedTasksFilter);
    getNotes(finishedTasksFilter)
      .then((data) => {
        dispatch({
          type: 'LOAD_NOTE_LIST',
          payload: data,
        });
        dispatch({ type: 'LOADER', payload: false });
      })
      .catch((err) => {
        dispatch({ type: 'LOADER', payload: false });
        dispatch({ type: 'UPDATE_TOAST_MESSAGE', payload: err });
      });
  };

  return (
    <div>
      <button
        className="btn btn-danger btn-sm"
        onClick={() =>
          dispatch({
            type: 'MODAL_TOGGLE',
            payload: { section: 'createNewNote', open: true },
          })
        }
      >
        nuevo
      </button>

      <button
        title="filter"
        className="btn btn-dark btn-sm"
        onClick={() =>
          dispatch({
            type: 'MODAL_TOGGLE',
            payload: { section: 'filters', open: true },
          })
        }
      >
        <i className="fa fa-filter" />
      </button>

      <Toggle
        id="cheese-status"
        defaultChecked={finishedTasksFilter}
        onChange={() => getAllNotes()}
      />
      <label style={{ marginLeft: '10px' }} htmlFor="cheese-status">
        {finishedTasksFilter ? 'activos' : 'terminados'}
      </label>
    </div>
  );
};

export default Buttons;
