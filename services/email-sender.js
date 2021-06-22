const sendgridMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
require('dotenv').config();

class CreateSenderSendGrid {
  async send(message) {
    sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
    return await sendgridMail.send({
      ...message,
      from: 'oleh.sydorenko1994@gmail.com',
    });
  }
}

class CreateSenderNodemailer {
  async send(message) {
    const config = {
      host: 'smtp.meta.ua',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    };
    const transporter = nodemailer.createTransport(config);
    return await transporter.sendMail({
      ...message,
      from: process.env.EMAIL,
    });
  }
}

module.exports = { CreateSenderSendGrid, CreateSenderNodemailer };
