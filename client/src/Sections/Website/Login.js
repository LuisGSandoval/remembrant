import React, { useState, useContext } from 'react';
import { CTX } from '../../Store/Store';
import { login } from '../../Actions/AuthActions';
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
function Login() {
  const [, dispatch] = useContext(CTX);

  const [loginForm, setLogin] = useState({
    email: '',
    password: '',
    errors: {}
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setLogin({ ...loginForm, [name]: value });
  };
  const loginSubmition = e => {
    e.preventDefault();

    dispatch({
      type: 'LOADER_ACTIVATION',
      payload: true
    });
    login(loginForm)
      .then(console.log)
      .catch(errors => {
        dispatch({
          type: 'LOADER_ACTIVATION',
          payload: false
        });
        setLogin({ ...loginForm, errors });
      });
  };

  const { email, password, errors } = loginForm;

  return (
    <div className="bg-login">
      <Container className=" mt--8 vh-100 d-flex justify-content-center align-items-center">
        <Col lg="5" md="7">
          <Card className="bg-light border-0 mb-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-secondary mb-4">
                <small>Siéntete como en casa</small>
              </div>
              <Form role="form" onSubmit={loginSubmition}>
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

                <div className="text-center">
                  <Button className="my-4" color="dark" type="submit">
                    Ingresar
                  </Button>
                </div>

                <Link to="/register">Registrarse</Link>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </div>
  );
}

export default Login;
