import { axiosInst } from '../Utils/axios';

export const getTxs = () => {
  return new Promise((resolve, reject) => {
    axiosInst
      .get('/api/transactions/')
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
