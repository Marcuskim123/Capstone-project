import "server-only";
import { checkSessionCookie, createSession } from "@/lib/session";
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const { uid, IdToken } = await request.json();
    if (!IdToken || !uid) {
      return NextResponse.json(
        { error: "The required fields are not founded" },
        { status: 500 }
      );
    }
    console.log(
      `userID: ${uid} \n IdToken: ${IdToken}`
    );

    // login process to firebase
    const cookie = createSession(IdToken);
    //Check cookie status
    if (!cookie) {
        return NextResponse.json(
        { error: "The cookie cannot be created"},
        { status: 500 }
      );
    }

    
    return NextResponse.json(
      {message: "cookie has been set successfully"},
      {status: 200,}
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
    const cookie = checkSessionCookie();

    if (cookie) {
      return new Response(
        JSON.stringify({
          message: "Session sucessfully verified",
          user: "DummyNickname",
          uid: "a1231231",
          email: "@mail.com",
          authenticated: true,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new Response(
        "There is error within cookie verification, please try again",
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
