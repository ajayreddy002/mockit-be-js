const nodeMailer = require('nodemailer');

const sendMail = async (template, toMail, subject) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtpout.secureserver.net',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PWD,
    },
    port: 465,
    logger: true // Enable logging
  });
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: toMail,
    subject,
    html: template,
  };
  return new Promise((resolve,reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      }
      if(info){
        resolve(true);
      }
    });
  })
};
module.exports = sendMail;
