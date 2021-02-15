import Validator from 'validator';
import isEmpty from './isEmpty';

function validateLoginForm(data) {
  let errors = {};

  data.userid = !isEmpty(data.userid) ? data.userid : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // if (!Validator.isEmail(data.userid)) {
  //   errors.userid = 'userid is invalid';
  // }

  if (Validator.isEmpty(data.userid)) {
    errors.userid = 'userid is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateLoginForm