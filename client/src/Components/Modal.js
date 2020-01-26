import React, { useContext, Suspense } from 'react';
import { CTX } from '../Store/Store';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const ToDoCreateFrom = React.lazy(() =>
  import('../Sections/App/ToDo/ToDoCreateForm')
);

const ModalTemplate = () => {
  const [store, dispatch] = useContext(CTX);
  const { modalOpen } = store;
  const { section, open } = modalOpen;

  const toggle = () =>
    dispatch({ type: 'MODAL_TOGGLE', payload: { section: '', open: false } });

  return (
    <Modal
      isOpen={open}
      toggle={toggle}
      backdropTransition={{ timeout: 100 }}
      modalTransition={{ timeout: 100 }}
    >
      <ModalHeader toggle={toggle}>Notes</ModalHeader>
      <ModalBody>
        <Suspense fallback={<div>Cargando...</div>}>
          {section === 'createNewNote' && <ToDoCreateFrom />}
        </Suspense>
      </ModalBody>
    </Modal>
  );
};

export default ModalTemplate;
