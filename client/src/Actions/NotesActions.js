import { axiosInst } from '../Utils/axios';

export const createNote = data => {
  return new Promise((resolve, reject) => {
    axiosInst
      .post('/api/notes/', data)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response.data));
  });
};

export const getNotes = () => {
  return new Promise((resolve, reject) => {
    axiosInst
      .get('/api/notes/')
      .then(res => resolve(res.data))
      .catch(err => reject(err.response.data));
  });
};

export const updateNote = id => {
  return new Promise((resolve, reject) => {
    axiosInst
      .get(`/api/notes/${id}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response.data));
  });
};

export const deleteNote = id => {
  return new Promise((resolve, reject) => {
    axiosInst
      .get(`/api/notes/${id}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response.data));
  });
};

export const getNoteDetails = id => {
  return new Promise((resolve, reject) => {
    axiosInst
      .get(`/api/notes/${id}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};
