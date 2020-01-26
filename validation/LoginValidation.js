const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLogin(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isLength(data.email, { max: 80 })) {
    errors.email = 'El correo eléctronico puede tener máximo 80 letras';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Correo electrónico inválido';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Correo electrónico requerido';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Contraseña requerido';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
