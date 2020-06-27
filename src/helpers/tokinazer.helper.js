const jwt = require('jsonwebtoken');

const { ActionEnum, ResponseStatusCodesEnum } = require('../constants');
const { ErrorHandler } = require('../error');
const { config } = require('../config');

module.exports = async (action) => {
  let access_token;
  let refresh_token;

  switch (action) {
    case ActionEnum.USER_AUTH:
      access_token = jwt.sign({}, config.JWT_SECRET, { expiresIn: config.ACCESS_TOKEN_LIFETIME });
      refresh_token = jwt.sign({}, config.JWT_REFRESH_SECRET, { expiresIn: config.REFRESH_TOKEN_LIFETIME });
      break;

    case ActionEnum.USER_REGISTER:
      access_token = jwt.sign({}, config.JWT_CONFIRM_EMAIL_SECRET, { expiresIn: config.JWT_CONFIRM_EMAIL_LIFETIME });
      break;
      //
    case ActionEnum.FORGOT_PASSWORD:
      access_token = jwt.sign({}, config.JWT_PASS_FORGOT_SECRET, { expiresIn: config.JWT_PASS_FORGOT_LIFETIME });
      break;

    default:
      throw new ErrorHandler(ResponseStatusCodesEnum.SERVER, 'wrong Action type');
  }

  return {
    access_token,
    refresh_token,
  };
};
