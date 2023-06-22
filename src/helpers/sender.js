import nodemailer from "nodemailer";
import { emailSend } from "../email.js";
import { __dirname } from "../utils.js";
import path from "path";
import twilio from "twilio";

const TWILIO_ACCOUNT_SID = "AC0efb79b49ca23cdc0e1c883995564b2c";
const TWILIO_AUTH_TOKEN = "ffe0eda8f55702fdeaef6c7264d1950e";
const TWILIO_PHONE_NUMBER = "+14849399573";

const client = twilio(
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER
);

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
          path: path.join(__dirname, "/public/assets/welcome.png"),
          cid: "welcome",
        },
      ],
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  },
};
export const senderSMS = {
  CustomSMS: async function (messageSend) {
    let { message } = messageSend;
    let result = await client.messages.create({
      from: TWILIO_PHONE_NUMBER,
      to: "+51970927520",
      body: `${message}`,
    });
    console.log("SMS sent");
    return result;
  },
  Whatsapp: async function (messageSend) {
    let { message} = messageSend;
    let result = client.messages.create({
      body: `${message}`,
      from: "whatsapp:+14849399573",
      to: "whatsapp:+51970927520",
    });
    console.log("Whatsapp sent");
    return result;
  },
};

/*import { senderSMS } from "../helpers/sender.js";
                senderSMS
                  .CustomSMS({message: mensaje})
                  .then((dat) => console.log(dat))
                  .catch((err) => console.log(err));*/
