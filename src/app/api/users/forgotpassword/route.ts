// Import necessary modules and configurations
import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

// Establish a connection to the database
connect();

// Define the main function for handling POST requests
export async function POST(request: NextRequest) {
  try {
    // Extract relevant data from the request body
    const reqBody = await request.json();
    const { email } = reqBody;

    // Validate email (additional validation can be added if needed)

    // Find the user by email in the database
    const user = await User.findOne({ email });

    // If user not found, return an error response
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Send the email with the reset password token
    await sendEmail({ email, emailType: "RESET", userId: user._id });

    // Return a success response
    return NextResponse.json({
      message: "Email sent successfully",
      success: true,
    });
  } catch (error: any) {
    // Handle errors and return an error response
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
