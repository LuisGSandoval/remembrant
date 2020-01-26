import React, { useContext, useEffect } from 'react';
import { CTX } from '../../../Store/Store';
import { getNotes } from '../../../Actions/NotesActions';
import { ListGroup, ListGroupItem, FormGroup, Label, Input } from 'reactstrap';
import PriorityBagde from '../../../Components/PriorityBagde';
import { format } from 'date-fns';

const ToDoList = () => {
  const [store, dispatch] = useContext(CTX);
  const { notes } = store;

  useEffect(() => {
    getNotes()
      .then(data => {
        dispatch({
          type: 'LOAD_NOTE_LIST',
          payload: data
        });
      })
      .catch(err => {
        dispatch({ type: 'UPDATE_TOAST_MESSAGE', payload: err });
      });
    return () => {
      dispatch({
        type: 'LOAD_NOTE_LIST',
        payload: []
      });
    };
  }, [dispatch]);

  return (
    <div className="mt-4">
      <ListGroup>
        {notes &&
          notes.length > 0 &&
          notes.map(note => (
            <ListGroupItem>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" checked={note.finishedTask} />

                  <PriorityBagde priority={note.priority} />

                  {note.title}

                  <span className="text-muted ml-2">
                    {format(new Date(note.executionDate), 'yyyy-MM-dd')}
                  </span>
                </Label>
              </FormGroup>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
};

export default ToDoList;
