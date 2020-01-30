import React, { useState, useContext, useEffect } from 'react';
import { CTX } from '../../../Store/Store';
import { Tooltip } from 'reactstrap';
import { getNoteDetails, deleteNote } from '../../../Actions/NotesActions';
import PriorityBagde from '../../../Components/PriorityBagde';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ToDoDetails = () => {
  const [store, dispatch] = useContext(CTX);
  const [editToolTip, setEditToolTip] = useState(false);
  const [deleteToolTip, setDeleteToolTip] = useState(false);

  const { noteId, noteDetails, notes } = store;

  const toggleEditToolTip = () => setEditToolTip(!editToolTip);
  const toggleDeleteToolTip = () => setDeleteToolTip(!deleteToolTip);
  const toggleUpdateMode = () => {
    dispatch({ type: 'ACTIVATE_UPDATE_MODE', payload: true });
    dispatch({ type: 'NOTE_FORM_UPDATE', payload: noteDetails });
  };

  const removeNote = () => {
    deleteNote(noteId)
      .then(data => {
        let ind = notes.indexOf(noteId);
        notes.splice(ind, 1);
        dispatch({ type: 'LOAD_NOTE_LIST', payload: [...notes] });

        dispatch({ type: 'UPDATE_TOAST_MESSAGE', payload: data });
        dispatch({ type: 'MODAL_TOGGLE', payload: false });
      })
      .catch(err => {
        dispatch({ type: 'UPDATE_TOAST_MESSAGE', payload: err });
      });
  };

  useEffect(() => {
    getNoteDetails(noteId)
      .then(data => {
        dispatch({ type: 'LOAD_NOTE_DETAILS', payload: data });
      })
      .catch(err => {
        console.log(err);
      });
  }, [dispatch, noteId]);

  return (
    <div className="container">
      <div className="row">
        {/* options */}
        <div className="col-4 offset-8">
          <button
            className="btn btn-primary mr-2"
            id="editButton"
            onClick={toggleUpdateMode}
          >
            <i className="fa fa-edit" />
          </button>
          <Tooltip
            placement="top"
            isOpen={editToolTip}
            target="editButton"
            toggle={toggleEditToolTip}
          >
            Editar nota
          </Tooltip>

          <button
            className="btn btn-danger"
            id="deleteNote"
            onClick={removeNote}
          >
            <i className="fa fa-trash" />
          </button>
          <Tooltip
            placement="top"
            isOpen={deleteToolTip}
            target="deleteNote"
            toggle={toggleDeleteToolTip}
          >
            Eliminar nota
          </Tooltip>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card mt-4">
            <div className="card-body">
              {noteDetails && (
                <>
                  <span>
                    <span className="text-muted">Prioridad: </span>
                    <PriorityBagde priority={noteDetails.priority} />
                  </span>
                  <br />
                  <span>
                    <span className="text-muted">Fecha de realización: </span>
                    {noteDetails.executionDate &&
                      format(
                        new Date(noteDetails.executionDate),
                        'dd MMMM yyyy',
                        {
                          locale: es
                        }
                      )}
                  </span>
                  <br />
                  <span>
                    <span className="text-muted">Título: </span>
                    {noteDetails.title}
                  </span>
                  <br />
                  <span>
                    <span className="text-muted">Description: </span>
                    {noteDetails.description}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoDetails;
