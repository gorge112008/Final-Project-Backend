import nodemailer from "nodemailer";
import { emailSend } from "../email.js";

export const senderMail = {
  Sender: async function (userSend) {
    const { first_name, email, user } = userSend;
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "508c9eaafdc543",
        pass: "d2a384bde55fd7",
      },
    });

    let info = await transporter.sendMail({
      from: '"JorgeBack ☀️" <gorgexc4@gmail.com>', // direccion de envio
      to: email, // lista de quienes reciben
      subject: `Hello ${first_name}🥳✔`, // Asunto
      text: "Hello world?", // Texto plano
      html: emailSend.emailTemplate(first_name), // Email html
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  },
};
