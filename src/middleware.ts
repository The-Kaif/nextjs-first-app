import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Paths accessible without authentication
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";

  // If the path is public and the user is authenticated, extract user ID and redirect to the profile page
  if (isPublicPath && token) {
    try {
      const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
      const userId = decodedToken.id;

      return NextResponse.redirect(
        new URL(`/profile/${userId}/home`, request.nextUrl)
      );
    } catch (error) {
      // Handle token verification errors
      console.error("Token verification failed:", error);
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  // If the path is not public and the user is not authenticated, redirect to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If the root path is accessed, redirect to the login page
  if (path === "/") {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If everything is fine, allow the request to proceed
  // add the comment for somereason
}

export const config = {
  matcher: ["/", "/login", "/signup", "/profile/:id/home", "/verifyemail"],
};
