import nodemailer from "nodemailer";
import "dotenv/config"
import template from './template.user';


const sendMail =  (data, subject) => {
  let transports = nodemailer.createTransport ({
    host: "smtp.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.mail,
        pass: process.env.password,
    },
  })
  transports.sendMail({
      from: '"rpalacioso12@outlook.com"',
      to: data.email,
      subject: subject,
      text: "Hello world?",
      html: template.welcome(data),
  });
 
}
   
export default sendMail;


