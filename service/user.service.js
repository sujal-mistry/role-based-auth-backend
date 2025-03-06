const da = require("../data_access/user.data_access");
const logger = require("../helper/logger");
const em = require("../helper/email");

const customer_register = async (request, response) => {
  try {
    let data = await da.customer_register(request);
    response.status(200).send(data);
  } catch (error) {
    logger.log_error(error);
    response.status(500).send(error);
  }
};

const validate_otp = async (request, response) => {
  try {
    let data = await da.validate_otp(request);
    response.status(200).send(data);
  } catch (error) {
    logger.log_error(error);
    response.status(500).send(error);
  }
};

const admin_login = async (request, response) => {
  try {
    let data = await da.admin_login(request);
    response.status(200).send(data);
  } catch (error) {
    logger.log_error(error);
    response.status(500).send(error);
  }
};

module.exports = {
  customer_register,
  validate_otp,
  admin_login,
};
