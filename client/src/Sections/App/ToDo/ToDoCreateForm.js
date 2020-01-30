import React, { useContext } from 'react';
import { CTX } from '../../../Store/Store';
import { Button, Input } from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import PriorityBagde from '../../../Components/PriorityBagde';

import { createNote, updateNote } from '../../../Actions/NotesActions';

const ToDoCreateForm = () => {
  const [store, dispatch] = useContext(CTX);
  const { todoForm } = store;
  const { notes, updateMode } = store;
  const { executionDate, title, description, priority, errors } = todoForm;

  const handleChange = e => {
    const { name, value } = e.target;
    dispatch({
      type: 'NOTE_FORM_UPDATE',
      payload: { ...todoForm, [name]: value }
    });
  };

  const sendToDo = e => {
    e.preventDefault();

    delete todoForm.errors;
    todoForm.executionDate = new Date(executionDate).getTime();

    if (!updateMode) {
      createNote(todoForm)
        .then(data => {
          console.log(data);
          dispatch({ type: 'UPDATE_TOAST_MESSAGE', payload: data });
          dispatch({
            type: 'LOAD_NOTE_LIST',
            payload: [...notes, data.data]
          });
          dispatch({ type: 'MODAL_TOGGLE', payload: false });
        })
        .catch(err => {
          dispatch({
            type: 'NOTE_FORM_UPDATE',
            payload: { ...todoForm, errors: err }
          });

          dispatch({ type: 'UPDATE_TOAST_MESSAGE', payload: err });

          console.log(err);
        });
    } else {
      updateNote(todoForm)
        .then(data => {
          dispatch({ type: 'UPDATE_TOAST_MESSAGE', payload: data });
          let newNotes = notes.map(note => {
            if (note._id === todoForm._id) {
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
          dispatch({
            type: 'NOTE_FORM_UPDATE',
            payload: { ...todoForm, errors: err }
          });

          dispatch({ type: 'UPDATE_TOAST_MESSAGE', payload: err });

          console.log(err);
        });
    }
  };

  return (
    <form onSubmit={sendToDo}>
      <div className="row">
        <div className="col-12">
          <label htmlFor="priority">* Prioridad</label>

          <input
            type="range"
            name="priority"
            className="mx-3"
            id="priority"
            min="1"
            max="5"
            value={priority}
            onChange={handleChange}
          />

          <PriorityBagde priority={priority} />

          {errors && errors.priority && (
            <div className="text-danger">{errors.priority}</div>
          )}
        </div>

        <div className="col-12 mt-3">
          <div className="form-group">
            <label htmlFor="dueDate">* Fecha</label>

            <Flatpickr
              id="dueDate"
              options={{
                altFormat: 'F j, Y',
                dateFormat: 'D d-M-Y',
                locale: {
                  firstDayOfWeek: 0
                }
              }}
              className={`form-control bg-white ${
                errors && errors.executionDate ? 'is-invalid' : ''
              }`}
              placeholder="para realizar el: "
              value={executionDate}
              onChange={e =>
                dispatch({
                  type: 'NOTE_FORM_UPDATE',
                  payload: { ...todoForm, executionDate: e[0] }
                })
              }
            />
            <div className="invalid-feedback">
              {errors && errors.executionDate}
            </div>
          </div>
        </div>

        <div className="col-12 mt-3">
          <label htmlFor="description">* Título de la nota</label>

          <Input
            className={`bg-white ${errors && errors.title ? 'is-invalid' : ''}`}
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
            placeholder="Título de la nota"
          />
          <div className="invalid-feedback">{errors && errors.title}</div>
        </div>

        <div className="col-12 mt-5">
          <label htmlFor="description">* Descripción de la nota</label>
          <Input
            className={`bg-white ${
              errors && errors.description ? 'is-invalid' : ''
            }`}
            type="textarea"
            value={description}
            rows="5"
            name="description"
            placeholder="Detalles"
            onChange={handleChange}
            id="description"
          />
          <div className="invalid-feedback">{errors && errors.description}</div>
        </div>
      </div>
      <div className="col-12 p-4 d-flex justify-content-center">
        <Button color="primary" type="submit">
          {updateMode ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  );
};

export default ToDoCreateForm;
