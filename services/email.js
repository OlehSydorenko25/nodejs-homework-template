const Mailgen = require('mailgen');
require('dotenv').config();

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case 'development':
        this.link = process.env.LOCAL_HOST;
        break;

      case 'production':
        this.link = 'link for production';
        break;

      default:
        this.link = process.env.LOCAL_HOST;
        break;
    }
  }
  #createTemplateVerificationEmail(verifyToken, mail) {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Mailgen test',
        link: this.link,
      },
    });
    const email = {
      body: {
        name: mail,
        intro:
          "Welcome to Mailgen test! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with Mailgen, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    return mailGenerator.generate(email);
  }
  async sendVerifyEmail(verifyToken, email) {
    const emailHtml = this.#createTemplateVerificationEmail(verifyToken, email);
    const msg = {
      to: email,
      subject: 'Verify your account',
      html: emailHtml,
    };
    const result = await this.sender.send(msg);
    console.log(result);
  }
}

module.exports = EmailService;
