import React from 'react';
import EVolNavbar from '../../../Components/EVolNavbar';
import TransactionsList from './TransactionsList';

const index = () => {
  return (
    <>
      <EVolNavbar />
      <div className="container">
        <h3 className="mt-3">Transacciones</h3>
        <hr />
        <TransactionsList />
      </div>
    </>
  );
};

export default index;
