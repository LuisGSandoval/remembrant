import React, { useState, useContext } from 'react';
import { CTX } from '../../Store/Store';
import { register } from '../../Actions/AuthActions';
import { Link } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Container,
  Col
} from 'reactstrap';
function Registration() {
  const [, dispatch] = useContext(CTX);

  const [registerForm, setRegister] = useState({
    email: '',
    password: '',
    password2: '',
    errors: {}
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setRegister({ ...registerForm, [name]: value });
  };
  const registerSubmition = e => {
    e.preventDefault();

    dispatch({
      type: 'LOADER_ACTIVATION',
      payload: true
    });
    register(registerForm)
      .then(data => {
        dispatch({
          type: 'UPDATE_TOAST_MESSAGE',
          payload: data
        });
      })
      .catch(err => {
        dispatch({
          type: 'LOADER_ACTIVATION',
          payload: false
        });
        setRegister({ ...registerForm, errors: err });
        dispatch({
          type: 'UPDATE_TOAST_MESSAGE',
          payload: err
        });
      });
  };

  const { email, password, password2, errors } = registerForm;

  return (
    <div className="bg-login">
      <Container className=" mt--8 vh-100 d-flex justify-content-center align-items-center">
        <Col lg="5" md="7">
          <Card className="bg-light border-0 mb-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-secondary mb-4">
                <small>
                  Bienvenido, ingresa tus credenciales para registrarte
                </small>
              </div>
              <Form role="form" onSubmit={registerSubmition}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-merge input-group-alternative">
                    <Input
                      required
                      placeholder="Email"
                      type="email"
                      value={email}
                      name="email"
                      onChange={handleChange}
                      className={`form-control ${
                        errors.email ? 'is-invalid' : ''
                      }`}
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-merge input-group-alternative">
                    <Input
                      required
                      placeholder="Password"
                      type="password"
                      value={password}
                      name="password"
                      onChange={handleChange}
                      className={`form-control ${
                        errors.password ? 'is-invalid' : ''
                      }`}
                    />
                    <div className="invalid-feedback">{errors.password}</div>
                  </InputGroup>
                </FormGroup>

                <FormGroup className="mb-3">
                  <InputGroup className="input-group-merge input-group-alternative">
                    <Input
                      required
                      placeholder="Confirma la contraseña"
                      type="password"
                      value={password2}
                      name="password2"
                      onChange={handleChange}
                      className={`form-control ${
                        errors.password2 ? 'is-invalid' : ''
                      }`}
                    />
                    <div className="invalid-feedback">{errors.password2}</div>
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button className="my-4" color="dark" type="submit">
                    Registrarse
                  </Button>
                </div>
                <Link to="/">Ingresar</Link>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </div>
  );
}

export default Registration;
