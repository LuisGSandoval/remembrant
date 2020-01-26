const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateNoteCreation(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Es importante dar el título';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Es importante dar una breve descripción';
  }

  if (!new Date(data.executionDate).getTime() > 0) {
    errors.executionDate = 'Por favor agregar la fecha';
  }

  if (
    typeof data.priority !== 'number' &&
    (data.priority < 1 || data.priority > 5)
  ) {
    errors.priority = 'Prioridad invalida';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
