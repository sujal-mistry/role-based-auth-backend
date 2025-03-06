const logger = require("./logger");
const nodemailer = require("nodemailer");

const sendEmailForOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sujal.testing104@gmail.com",
      pass: "jghd dljy maci xaun",
    },
  });

  const mailOptions = {
    from: "Testing",
    to: email,
    subject: "Verify Your Email",
    text: `Your OTP for verification is: ${otp}. This OTP is valid for 5 mins`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.log_error(error);
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
};

module.exports = {
  sendEmailForOtp,
};
