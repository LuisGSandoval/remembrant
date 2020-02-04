import React, { useContext, useEffect } from 'react';
import { CTX } from '../../../Store/Store';
import { setNoteToFinished, getNotes } from '../../../Actions/NotesActions';
import { ListGroup, ListGroupItem, FormGroup, Input } from 'reactstrap';
import PriorityBagde from '../../../Components/PriorityBagde';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ToDoList = () => {
  const [store, dispatch] = useContext(CTX);
  const { notes } = store;

  useEffect(() => {
    dispatch({ type: 'LOADER', payload: true });
    getNotes()
      .then(data => {
        dispatch({
          type: 'LOAD_NOTE_LIST',
          payload: data
        });
        dispatch({ type: 'LOADER', payload: false });
      })
      .catch(err => {
        dispatch({ type: 'LOADER', payload: false });
        dispatch({ type: 'UPDATE_TOAST_MESSAGE', payload: err });
      });
    return () => {
      dispatch({
        type: 'LOAD_NOTE_LIST',
        payload: []
      });
      dispatch({ type: 'LOADER', payload: false });
    };
  }, [dispatch]);

  const setFinished = (id, finishedTask) => {
    setNoteToFinished({ id, finishedTask })
      .then(data => {
        dispatch({ type: 'UPDATE_TOAST_MESSAGE', payload: data });
        let newNotes = notes.map(note => {
          if (note._id === id) {
            return data.data;
          }
          return note;
        });
        dispatch({
          type: 'LOAD_NOTE_LIST',
          payload: newNotes
        });
        dispatch({ type: 'MODAL_TOGGLE', payload: false });
      })
      .catch(err => {
        dispatch({ type: 'UPDATE_TOAST_MESSAGE', payload: err });

        console.log(err);
      });
  };

  const toDoDetails = id => {
    dispatch({
      type: 'MODAL_TOGGLE',
      payload: { section: 'noteDetails', open: true }
    });
    dispatch({ type: 'LOAD_NOTE_ID', payload: id });
  };
  return (
    <div className="my-5">
      <ListGroup>
        {notes &&
          notes.length > 0 &&
          notes
            .sort(
              (a, b) =>
                new Date(a.executionDate).getTime() -
                new Date(b.executionDate).getTime()
            )
            .sort((a, b) => b.priority - a.priority)
            .sort((a, b) => a.finishedTask - b.finishedTask)
            .map(note => (
              <ListGroupItem
                className={`${note.finishedTask ? 'bg-secondary' : ''}`}
                action
                key={note._id}
              >
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={note.finishedTask}
                    onChange={() => setFinished(note._id, note.finishedTask)}
                  />

                  <div onClick={() => toDoDetails(note._id)} className="w-100">
                    <PriorityBagde priority={note.priority} />

                    {note.finishedTask ? (
                      <del>
                          <span className="text-white">
                            {note.title}
                          </span>
                        </del>
                    ) : (
                      <span>{note.title}</span>
                    )}

                    {note.finishedTask ? (
                      <del>
                        <span className="text-light ml-2">
                          {format(
                            new Date(note.executionDate),
                            'dd MMMM yyyy',
                            {
                              locale: es
                            }
                          )}
                        </span>
                      </del>
                    ) : (
                      <span className="text-muted ml-2">
                        {format(new Date(note.executionDate), 'dd MMMM yyyy', {
                          locale: es
                        })}
                      </span>
                    )}
                  </div>
                </FormGroup>
              </ListGroupItem>
            ))}
      </ListGroup>
    </div>
  );
};

export default ToDoList;
