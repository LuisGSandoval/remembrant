import React, { useEffect, Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { logout } from '../Actions/AuthActions';

// Utils / tools
import ToastifyComponent from '../Components/ToastifyComponent';
import ModalTemplate from '../Components/Modal';

// Visitor routes
const Login = React.lazy(() => import('./Website/Login'));
const Register = React.lazy(() => import('./Website/Register'));

// logged in users
const ToDo = React.lazy(() => import('./App/ToDo/ToDo'));

export default function Router() {
  useEffect(() => {
    var timeStampInMs =
      window.performance &&
      window.performance.now &&
      window.performance.timing &&
      window.performance.timing.navigationStart
        ? window.performance.now() + window.performance.timing.navigationStart
        : Date.now();

    if (window.localStorage.tokenExpDate < timeStampInMs / 1000) {
      logout();
    }
  }, []);

  return (
    <div>
      <ToastifyComponent />
      {window.localStorage.jwt !== undefined ? (
        <BrowserRouter>
          <ToastifyComponent />
          <ModalTemplate />
          <Suspense fallback={<div>Cargando...</div>}>
            <Switch>
              <Route path="/" component={ToDo} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Suspense fallback={<div>Cargando...</div>}>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/" component={Login} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      )}
    </div>
  );
}
