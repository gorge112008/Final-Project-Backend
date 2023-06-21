import nodemailer from "nodemailer";
import { emailSend } from "../email.js";
import { __dirname } from "../utils.js";
import path from "path";

export const senderMail = {
  Sender: async function (userSend) {
    const { first_name, email, user } = userSend;
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 2525,
      auth: {
        user: "gorgexc4@gmail.com",
        pass: "rgcsrngjiwfdutjt",
      },
    });

    let info = await transporter.sendMail({
      from: '"JorgeBack ☀️" <gorgexc4@gmail.com>', // direccion de envio
      to: email, // lista de quienes reciben
      subject: `Welcome, Hello ${first_name}🥳✔`, // Asunto
      text: "Welcome to Delipaso", // Texto plano
      html: emailSend.emailTemplate(first_name), // Email html
      attachments: [
        {
          filename: "welcome.png",
          path: path.join(__dirname,"/public/assets/welcome.png"),
          cid: "welcome",
        },
      ],
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  },
};
