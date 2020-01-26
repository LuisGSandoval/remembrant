import React, { useContext } from 'react';
import { CTX } from '../../../Store/Store';

const ToDoCreateButton = () => {
  const [, dispatch] = useContext(CTX);

  return (
    <button
      className="btn btn-danger"
      onClick={() =>
        dispatch({
          type: 'MODAL_TOGGLE',
          payload: { section: 'createNewNote', open: true }
        })
      }
    >
      nuevo
    </button>
  );
};

export default ToDoCreateButton;
