import nodemailer from "nodemailer";
import { User } from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    console.log("Hashed token: " + hashedToken, "UserId: " + userId.toString());
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    console.log("Transport", transport);

    const mailOptions = {
      from: "iammohdkaif15@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `  <p>Click <a target="_blank" href='${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "confirmpassword"
      }?token=${hashedToken}'>here</a>  
        to ${
          emailType === "VERIFY" ? "Verify your email" : "Reset your password"
        } You can also manually copy and paste the following link into a new browser tab: <br/>
        ${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "confirmpassword"
      }?token=${hashedToken}</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);

    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
