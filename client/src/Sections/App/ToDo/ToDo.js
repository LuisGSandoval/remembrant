import React from 'react';
import EVolNavbar from '../../../Components/EVolNavbar';
import ToDoCreateButton from './ToDoCreateButton';
import ToDoList from './ToDoList';

const Notes = () => {
  return (
    <div>
      <EVolNavbar />

      <div className="container">
        <h3 className="mt-3">Notas</h3>
        <hr />
        <ToDoCreateButton />
        <ToDoList />
      </div>
    </div>
  );
};

export default Notes;
