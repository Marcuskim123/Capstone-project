import "server-only";
import { checkSessionCookie, createSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { uid, IdToken } = await request.json();
    if (!IdToken || !uid) {
      return NextResponse.json(
        { error: "The required fields are not founded" },
        { status: 500 }
      );
    }

    // const sessionCookie = createSession(IdToken);

    const bakeCookies = await cookies();
    //bakes cookie for login
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(IdToken, {
      expiresIn: expiresIn,
    });
    bakeCookies.set("session", sessionCookie, {
      maxAge: expiresIn / 1000, // seconds (Next.js expects seconds)
      httpOnly: true,
      secure: true,
    });

    console.log(`userID: ${uid} \n IdToken: ${IdToken}\n\n\n CookieJWT:\n ${sessionCookie}`);

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "The cookie cannot be created" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "cookie has been set successfully", authenticated: true },
      { status: 200 }
    );

  } catch (e) {
    console.log("API ERROR " + e);
    return new Response("There is error at authenticating please try again", {
      status: 500,
    });
  }
}


// Get cookie and checks
export async function GET() {
  try {
    const cookie = await checkSessionCookie();

    if (cookie) {
      return NextResponse.json(
        {
          message: "Session sucessfully verified",
          uid: cookie.uid,
          email:cookie.email,
          authenticated: true,
        },
        {
          status: 200,
        }
      );
    } 
    else {
      return NextResponse.json(
        {
          message: "There is error within cookie verification, please try again",
          authenticated: false,
        },
        { status: 500 }
      );
    }
  } catch (err) {
    
    console.log("API ERROR /LOGIN GET " + err);
      return NextResponse.json(
        {
          message: "There is error within cookie verification, please try again",
          authenticated: false,
        },
        {
          status: 200,
        }
      );
  }
}
