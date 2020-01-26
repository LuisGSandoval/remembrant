import axios from 'axios';
import jwt_token from 'jwt-decode';

export const login = payload => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/access/login', payload)
      .then(res => {
        const { token } = res.data;
        const decoded = jwt_token(token);

        localStorage.setItem('jwt', token);

        const data = {
          email: decoded.email
        };

        localStorage.setItem('userData', JSON.stringify(data));
        localStorage.setItem('tokenExpDate', decoded.exp);

        window.location.assign('/');
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};

export const logout = () => {
  localStorage.clear();
  window.location.assign('/');
};

export const register = data => {
  return new Promise((resolve, rej) => {
    axios
      .post('/api/access/register', data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        rej(err.response.data);
      });
  });
};
