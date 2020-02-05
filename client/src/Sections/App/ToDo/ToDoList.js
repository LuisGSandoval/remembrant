import React, { useContext, useEffect, useState } from 'react';
import { CTX } from '../../../Store/Store';
import { setNoteToFinished, getNotes } from '../../../Actions/NotesActions';
import { sortItems } from '../../../Utils/sortItemsBy';
import {
  Tooltip,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Input
} from 'reactstrap';
import PriorityBagde from '../../../Components/PriorityBagde';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ToDoList = () => {
  const [store, dispatch] = useContext(CTX);
  const { notes, sortBy } = store;

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

  return (
    <div className="my-5">
      <ListGroup>
        {notes &&
          notes.length > 0 &&
          sortItems(notes, sortBy.type, sortBy.finished).map(note => (
            <ListItem note={note} key={note._id} />
          ))}
      </ListGroup>
    </div>
  );
};

const ListItem = ({ note }) => {
  const [store, dispatch] = useContext(CTX);
  const { notes } = store;

  const [editToolTip, setEditToolTip] = useState(false);

  const toggleEditToolTip = () => setEditToolTip(!editToolTip);

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
    <ListGroupItem
      className={`${note.finishedTask ? 'bg-secondary' : ''}`}
      action
    >
      <FormGroup check>
        <Input
          type="checkbox"
          checked={note.finishedTask}
          id={`a${note._id}finished`}
          onChange={() => setFinished(note._id, note.finishedTask)}
        />

        <Tooltip
          placement="top"
          isOpen={editToolTip}
          target={`a${note._id}finished`}
          toggle={toggleEditToolTip}
        >
          {note.finishedTask ? 'terminado' : 'sin terminar'}
        </Tooltip>

        <div onClick={() => toDoDetails(note._id)} className="w-100">
          <PriorityBagde priority={note.priority} />

          {note.finishedTask ? (
            <del>
              <span className="text-white">{note.title}</span>
            </del>
          ) : (
            <span>{note.title}</span>
          )}

          {note.finishedTask ? (
            <del>
              <span className="text-light ml-2">
                {format(new Date(note.executionDate), 'dd MMMM yyyy', {
                  locale: es
                })}
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
  );
};

export default ToDoList;
