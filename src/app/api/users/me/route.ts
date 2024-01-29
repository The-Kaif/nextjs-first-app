// Import necessary modules
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import { connect } from "@/app/dbConfig/dbConfig";

// Establish a database connection
connect();

// Define the main function for handling GET requests
export async function GET(request: NextRequest) {
  try {
    // Extract user ID from the provided token using a helper function
    const userID = await getDataFromToken(request);

    // Retrieve user data from the database based on the extracted user ID
    const user = await User.findOne({ _id: userID }).select("-password");

    // Return a success response with the retrieved user data
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    // Handle errors and return an error response with a status code
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
