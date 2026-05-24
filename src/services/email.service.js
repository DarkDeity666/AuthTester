import nodemailer from "nodemailer";
import config from "../config/config.js";



const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:"OAuth2",
        user:config.AUTH_USER,
        clientId:config.CLIENTID,
        clientSecret:config.CLIENTSECRET,
        refreshToken:config.REFRESH_TOKEN
    }
 })

 transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${config.AUTH_USER}>`, 
      to, 
      subject, 
      text, 
      html, 
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


export default sendEmail;