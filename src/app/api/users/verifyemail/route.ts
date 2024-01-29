// Import necessary modules
import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";

// Establish a database connection
connect();

// Define the main function for handling POST requests
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body of the request
    const reqBody = await request.json();
    const { token } = reqBody;
    
    // Log the received token to the console for debugging
    console.log(token);

    // Find a user with the provided verification token
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    // If no user is found, return an error response
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Log the found user details to the console for debugging
    console.log(user);

    // Update the user's verification status and clear the verification token
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    // Save the updated user details to the database
    await user.save();

    // Return a success response
    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    // Handle errors and return an error response with a status code
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
