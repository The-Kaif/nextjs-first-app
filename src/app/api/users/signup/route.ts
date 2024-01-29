// Import necessary modules
import { connect } from "@/app/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

// Establish a database connection
connect();

// Define the main function for handling POST requests
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body of the request
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Check if a user with the given email already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password for security
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new User instance with the provided details
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Log the saved user details to the console

    // Send a verification email to the user
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    // Return a success response with relevant details
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    // Handle errors and return an error response with a status code
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
