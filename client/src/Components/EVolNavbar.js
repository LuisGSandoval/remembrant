import React from 'react';
import { Navbar, NavbarBrand, NavbarText } from 'reactstrap';

import { logout } from '../Actions/AuthActions';

let user = window.localStorage.userData;
user = JSON.parse(user);

const EVolNavbar = () => {
  return (
    <div>
      <Navbar color="light" className="border-bottom border-danger" light>
        <NavbarBrand>remembrant</NavbarBrand>
        <NavbarText className="cursor-pointer" onClick={logout}>
          {user.email.split('@')[0]}
        </NavbarText>
        <NavbarText className="cursor-pointer" onClick={logout}>
          Salir
        </NavbarText>
      </Navbar>
    </div>
  );
};

export default EVolNavbar;
