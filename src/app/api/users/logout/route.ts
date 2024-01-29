// Import necessary modules
import { NextResponse } from "next/server";

// Define the main function for handling GET requests
export async function GET() {
  try {
    // Create a success response with a message and status code
    const response = NextResponse.json(
      {
        message: "Logout successfully",
        success: true,
      },
      {
        status: 200,
      }
    );

    // Clear the token cookie by setting an empty token and an expiration date in the past
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    // Return the response
    return response;
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
