import React from 'react';
import ReactDOM from 'react-dom';

import Router from './Sections/Router';
// PWA
import * as serviceWorker from './serviceWorker';

// core styles
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import 'flatpickr/dist/themes/material_green.css';
import './styles.css';

// Context hook API
import Store from './Store/Store';

ReactDOM.render(
  <Store>
    <Router />
  </Store>,
  document.getElementById('root')
);

serviceWorker.unregister();
