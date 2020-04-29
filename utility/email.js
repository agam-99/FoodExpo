const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
// new Email(user,url).sendWelcome();
// new Email(user,url).sendReciept();
// new Email(user,url).sendReset();
module.exports = class Email {
  constructor(user, url) {
    this.name = user.Name;
    this.url = url;
    this.to = user.email;
    this.from = "Jasbir Singh <pepcodingdev@gmail.com>";
  }
  newNodemailer() {
    return nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      // port: 2525,
      auth: {
        user: "pepcodingdev@gmail.com",
        pass: "ylepfuaaiciolgjc"
      }
    });
  }
  async send(template, subject) {
    // 1. Render pug templates
    var html = pug.renderFile(`${__dirname}/../template/${template}.pug`, {
      name: this.name,
      url: this.url
    });
    // 2. Define Email Options
    let EmailOptions = {
      from: this.from, // sender address
      to: this.to, // list of receivers
      subject: subject, // Subject line
      html: html,
      text: htmlToText.fromString(html)
    };
    // 3. Send Mail
    // this.newNodemailer();
    await this.newNodemailer().sendMail(EmailOptions);
  }
  async sendWelcome() {
    this.send("welcome", "Welcome to Origami Family");
  }
  async sendreset() {
    this.send("resetPassword", "Your Token is only valid for 10 minutes");
  }
};

// module.exports= async function sendEmail(options)  {

//   // 1. create transporter
//   var transporter =
//   // define email options
//   let EmailOptions={
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: options.recieverId, // list of receivers
//     subject: options.subject, // Subject line
//     text: options.message
//   }
//   // send email
//   await transporter.sendMail(EmailOptions);
// };
