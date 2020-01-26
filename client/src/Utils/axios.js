import axios from 'axios';
import { logout } from '../Actions/AuthActions';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const axiosInst = axios.create({
  headers: { Authorization: window.localStorage.jwt }
  // timeout: 1
});

const UNAUTHORIZED = 401;
axiosInst.interceptors.response.use(
  function(response) {
    return Promise.resolve(response);
  },
  function(error) {
    console.log(error);

    const { status } = error.response;
    if (status === UNAUTHORIZED) {
      logout();
    }
    if (
      error.code === 'ECONNABORTED' ||
      error.code === 'ERR_EMPTY_RESPONSE' ||
      status === 'ERR_EMPTY_RESPONSE'
    ) {
      source.cancel('Operation canceled by the user.');
    }
    return Promise.reject(error);
  }
);
