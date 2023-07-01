const nodeMailer = require('nodemailer');

const sendMail = async (req, res, next) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtpout.secureserver.net',
    auth: {
      user: "info@mockitt.in",
      pass: "Varcas@2021",
    },
    port: 465,
    logger: true // Enable logging
  });
  const mailOptions = {
    from: 'info@mockitt.in',
    to: 'varcasinfo@gmail.com',
    subject: 'Test email',
    text: 'This is a test email',
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent: ' + info.response);
      res
        .status(200)
        .send({ status: 'Success', message: 'Scheduled successfully' });
    }
  });
};
module.exports = sendMail;
