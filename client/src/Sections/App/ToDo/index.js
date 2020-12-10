import React from 'react';
import EVolNavbar from '../../../Components/EVolNavbar';
import Buttons from './Buttons';
import ToDoList from './ToDoList';

const Notes = () => {
  return (
    <div>
      <EVolNavbar />

      <div className="container">
        <h3 className="mt-3">Notas</h3>
        <hr />
        <Buttons />

        <ToDoList />
      </div>
    </div>
  );
};

export default Notes;
