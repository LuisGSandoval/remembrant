import React from 'react';
import { Navbar, NavbarBrand, NavbarText } from 'reactstrap';

import { logout } from '../Actions/AuthActions';

const EVolNavbar = () => {
  return (
    <div>
      <Navbar color="light" className="border-bottom border-danger" light>
        <NavbarBrand>Remembrant</NavbarBrand>

        <NavbarText className="cursor-pointer" onClick={logout}>
          Salir
        </NavbarText>
      </Navbar>
    </div>
  );
};

export default EVolNavbar;
