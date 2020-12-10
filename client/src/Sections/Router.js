import React, { useEffect, Suspense, useContext } from 'react';
import { CTX } from '../Store/Store';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { logout } from '../Actions/AuthActions';
import { Spinner } from 'reactstrap';

// Utils / tools
import ToastifyComponent from '../Components/ToastifyComponent';
import ModalTemplate from '../Components/Modal';

// Visitor routes
const Login = React.lazy(() => import('./Website/Login'));

// logged in users
const ToDo = React.lazy(() => import('./App/ToDo'));
const Transactions = React.lazy(() => import('./App/Transactions'));

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

  const [store] = useContext(CTX);

  return (
    <div>
      <ToastifyComponent />
      {window.localStorage.jwt !== undefined ? (
        <BrowserRouter>
          <ModalTemplate />
          <Suspense fallback={<div>Cargando...</div>}>
            <Switch>
              <Route path="/transactions" component={Transactions} />
              <Route path="/" component={ToDo} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Suspense fallback={<div>Cargando...</div>}>
            <Switch>
              <Route path="/" component={Login} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      )}

      {store.loaderActivation && (
        <div className="w-100 d-flex justify-content-center m-5">
          <Spinner color="danger" />
        </div>
      )}
    </div>
  );
}
