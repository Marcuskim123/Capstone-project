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
    console.log(`userID: ${uid} \n IdToken: ${IdToken}`);

    // login process to firebase
    const cookie = createSession(IdToken);

    //Check cookie status
    if (!cookie) {
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

export async function GET() {
  try {
    const cookie = await checkSessionCookie();

    if (cookie) {
      return new NextResponse.json(
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
    } else {
      return new NextResponse.json(
        {
          message: "There is error within cookie verification, please try again",
          authenticated: false,
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.log("API ERROR /LOGIN GET", +err);
    return new Response("There is error at authenticating your cookie", {
      status: 500,
    });
  }
}
