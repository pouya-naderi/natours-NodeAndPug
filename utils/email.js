const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstname = user.name.split(' ')[0];
    this.url = url;
    this.from = 'Haj Pouya <hello@pouya.io>';
  }
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // sendGrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 1,
          pass: 1,
        },
      });
    }
    return nodemailer.createTransport({
      host: '127.0.0.1',
      port: 1025,
      // auth: {
      //   user: process.env.EMAIL_USERNAME,
      //   pass: process.env.EMAIL_PASSWORD,
      // },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstname: this.firstname,
      url: this.url,
      subject,
    });
    // Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.htmlToText(html),
    };
    // Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minute)'
    );
  }
};

// const sendEmail = async (options) => {
// // const testAccount = nodemailer.createTestAccount();
// // 1) create a transporter
// const transporter = nodemailer.createTransport({
//   host: '127.0.0.1',
//   port: 1025,
//   enable_starttls_auto: false,
//   // secure: false,
//   // auth: {
//   //   user: testAccount.user,
//   //   pass: testAccount.pass,
//   // service: 'Gmail',
//   // auth: {
//   //   user: 'pouyanaderi72@gmail.com',
//   //   pass: 'p12451245',
//   // },
// });
// // 2) define the email options
// const mailOptions = {
//   from: 'Haj Pouya <hello@jonas.io>',
//   to: options.email,
//   subject: options.subject,
//   text: options.message,
// };
// // 3) send the email
// await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;
