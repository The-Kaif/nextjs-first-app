// Import necessary modules and configurations
import { connect } from "@/app/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Establish a connection to the database
connect();

// Define the main function for handling POST requests
export async function POST(request: NextRequest) {
  try {
    // Extract relevant data from the request body
    const requestData = await request.json();
    const { email, password } = requestData;

    // Find the user by email in the database
    const user = await User.findOne({ email });

    // If user not found, return an error response
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 400 }
      );
    }

    // Compare the provided password with the stored hashed password
    const validPassword = await bcryptjs.compare(password, user.password);

    // If the password is invalid, return an error response
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Create token data with user information
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create a JWT token with the provided data
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "4h",
    });

    // Prepare the response with success message, data, and set the token as an HTTP-only cookie
    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
      data: tokenData,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    // Handle errors and return an error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
