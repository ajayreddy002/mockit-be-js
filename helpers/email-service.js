const nodeMailer = require('nodemailer');

const sendMail = async (req, res, next) => {
  let account = await nodeMailer.createTestAccount();
  const transporter = nodeMailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: account?.user,
      pass: account?.pass,
    },
  });
  const mailOptions = {
    from: 'info@varcasinfo.com',
    to: 'ajaykumarreddy401@gmail.com',
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
