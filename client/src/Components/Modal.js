import React, { useContext, Suspense } from 'react';
import { CTX } from '../Store/Store';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Spinner } from 'reactstrap';

const ToDoCreateFrom = React.lazy(() =>
  import('../Sections/App/ToDo/ToDoCreateForm')
);

const ToDoDetais = React.lazy(() => import('../Sections/App/ToDo/ToDoDetails'));

const ModalTemplate = () => {
  const [store, dispatch] = useContext(CTX);
  const { modalOpen, updateMode } = store;
  const { section, open } = modalOpen;

  const toggle = () => {
    dispatch({ type: 'LOAD_NOTE_ID', payload: '' });
    dispatch({ type: 'LOAD_NOTE_DETAILS', payload: null });
    dispatch({ type: 'ACTIVATE_UPDATE_MODE', payload: false });
    dispatch({
      type: 'NOTE_FORM_UPDATE',
      payload: {
        executionDate: '',
        title: '',
        description: '',
        priority: 1,
        errors: {}
      }
    });
    dispatch({ type: 'MODAL_TOGGLE', payload: { section: '', open: false } });
  };

  return (
    <Modal
      isOpen={open}
      toggle={toggle}
      backdropTransition={{ timeout: 100 }}
      modalTransition={{ timeout: 100 }}
    >
      <ModalHeader toggle={toggle}>Notes</ModalHeader>
      <ModalBody>
        {store.loaderActivation && (
          <div className="w-100 d-flex justify-content-center m-5">
            <Spinner color="danger" />
          </div>
        )}
        <Suspense fallback={<div>Cargando...</div>}>
          {(updateMode || section === 'createNewNote') && <ToDoCreateFrom />}
          {!updateMode && section === 'noteDetails' && <ToDoDetais />}
        </Suspense>
      </ModalBody>
    </Modal>
  );
};

export default ModalTemplate;
