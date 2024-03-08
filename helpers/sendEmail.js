import sgMail from "@sendgrid/mail";
import "dotenv/config";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: process.env.EMAIL,
    subject,
    text,
    html,
  };

  try {
    console.log("msg");
    console.log(msg);
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
    throw new Error("Error sending email");
  }
};

export default sendEmail;
