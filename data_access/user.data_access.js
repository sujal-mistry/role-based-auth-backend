const mysql = require("../helper/mysql");
const logger = require("../helper/logger");
const em = require("../helper/email");

const customer_register = async (request, response) => {
  const pool = await mysql.get_pool();

  try {
    const { first_name, last_name, email, password, is_admin } = request.body;

    const otp_res = await sendOtp(email);

    if (otp_res.status === 200) {
      _ = await pool.execute("CALL user_register(?, ?, ?, ?, ?)", [
        first_name,
        last_name,
        email,
        password,
        is_admin,
      ]);
    }

    pool.end();
    return otp_res;
  } catch (error) {
    logger.log_error(error);
  }
};

const sendOtp = async (email) => {
  const pool = await mysql.get_pool();
  try {
    const [result] = await pool.execute("CALL send_otp(?)", [email]);

    let res_data = result[0][0];

    if (res_data.status === 200) {
      _ = await em.sendEmailForOtp(email, res_data.otp);
    }

    pool.end();
    return res_data;
  } catch (error) {
    logger.log_error(error);
  }
};

const validate_otp = async (request) => {
  const pool = await mysql.get_pool();
  try {
    const { email, otp } = request.body;

    const [result] = await pool.execute("CALL validate_otp(?,?)", [email, otp]);

    let res_data = result[0][0];

    pool.end();
    return res_data;
  } catch (error) {
    logger.log_error(error);
  }
};

const admin_login = async (request) => {
  const pool = await mysql.get_pool();
  try {
    const { email, password } = request.body;

    const [result] = await pool.execute("CALL admin_login(?,?)", [
      email,
      password,
    ]);

    console.log("result", result);

    let res_data = result[0][0];

    pool.end();
    return res_data;
  } catch (error) {
    logger.log_error(error);
  }
};

module.exports = {
  customer_register,
  validate_otp,
  admin_login,
};
