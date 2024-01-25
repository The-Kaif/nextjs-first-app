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
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9be9f2f3eeae11",
        pass: "692bded088a537",
      },
    });

    const mailOptions = {
      from: "kaifmohammad5990@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `  <p>Click <a href='${process.env.DOMAIN}'/${
        emailType === "VERIFY" ? "verifyemail" : "confirmpassword"
      }?token=${hashedToken}'>here<a/> 
        to ${
          emailType === "VERIFY" ? "Verify your email" : "Reset your password"
        } Or you can copy and paste the link below <br/>
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
