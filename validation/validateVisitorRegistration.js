const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateVisitorRegistration(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.email, { min: 7, max: 80 })) {
    errors.msg = 'El correo eléctronico puede tener máximo 80 letras';
  }

  if (!Validator.isEmail(data.email)) {
    errors.msg = 'Correo electrónico inválido';
  }

  if (Validator.isEmpty(data.email)) {
    errors.msg = 'El email es requerido';
  }

  if (!Validator.equals(data.password2, data.password)) {
    errors.password = 'Las contraseñas deben ser iguales';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 50 })) {
    errors.password = 'La contraseña debe tener mínimo 6 letras, máximo 50';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'La contraseña es necesaria';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'La confirmación de contraseña es necesaria';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
