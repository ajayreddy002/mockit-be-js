const sendMail = require("../helpers/email-service");
const path = require("path");
const fs = require('fs');
const handlebars = require('handlebars');

const otpTemplatePath = path.join(__dirname, '../email-templates/otp-template.handlebars');
const otpTemplateSource = fs.readFileSync(otpTemplatePath, 'utf-8').toString();
const resetPwdPath = path.join(__dirname, '../email-templates/reset-password.handlebars');
const resetPwdTemplateFile = fs.readFileSync(resetPwdPath, 'utf-8').toString();


module.exports = {
    sendOtpToEmail: async (mailId, verificationCode) => {
        try {
            const otpTemplate = handlebars.compile(otpTemplateSource);
            return await sendMail(otpTemplate({ otp: verificationCode }), mailId, 'Verify your account')
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: 'Error', message: 'Failed to send email' });
        }
    },
    resetPasswordMail: async (mailId, token) => {
        const resetPwdTemplate = handlebars.compile(resetPwdTemplateFile);
        return await sendMail(resetPwdTemplate({ token }), mailId, 'Reset password link')
    }
}