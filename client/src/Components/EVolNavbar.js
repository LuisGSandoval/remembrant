import React from 'react';
import { Navbar, NavbarBrand, NavbarText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { logout } from '../Actions/AuthActions';

const EVolNavbar = () => {
  return (
    <div>
      <Navbar color="light" className="border-bottom border-danger" light>
        <NavbarBrand tag={Link} to="/">
          Remembrant
        </NavbarBrand>

        <NavbarText className="cursor-pointer" tag={Link} to="/transactions">
          transacciones
        </NavbarText>
        <NavbarText className="cursor-pointer" onClick={logout}>
          Salir
        </NavbarText>
      </Navbar>
    </div>
  );
};

export default EVolNavbar;
