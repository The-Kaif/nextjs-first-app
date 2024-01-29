// Import necessary modules and configurations
import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import bcryptjs from "bcryptjs";

// Establish a connection to the database
connect();

// Define the main function for handling POST requests
export async function POST(request: NextRequest) {
  try {
    // Extract relevant data from the request body
    const reqBody = await request.json();
    const { token, newPassword } = reqBody;

    // Validate token and newPassword (additional validation can be added if needed)

    // Verify the token against the stored token in the database
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    // If the token is not valid, return an error response
    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Update the user's password in the database
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    // Save the updated user data to the database
    await user.save();

    // Return a success response
    return NextResponse.json({
      message: "Password reset successful",
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
