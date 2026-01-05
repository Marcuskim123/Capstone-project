import "server-only";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase.config"
import { checkSessionCookie, createSession } from '@/lib/session'
import { verify } from "crypto";
export async function POST(request) {
  try {


    const { email, password } = await request.json();
    // login process to firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const signedUser = userCredential.user.displayName;
    const token = await userCredential.user.getIdToken();
    // const refToken = userCredential.user.refreshToken
    const userUid = userCredential.user.uid;


    createSession(token);
    //send response
    return new Response(
      JSON.stringify({
        message: `You have been login to ${signedUser} and cookie has been set`,
        user: signedUser,
        uid: userUid,
        email: userCredential.user.email,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
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
    const cookie = checkSessionCookie()

    if (!cookie) {
      return new Response(
        JSON.stringify({
          message: "Session sucessfully verified",
          user: "DummyNickname",
          uid: "a1231231",
          email: "@mail.com",
          authenticated:true
        }), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      })
    }
    else {
      return new Response("There is error within cookie verification, please try again", { status: 500 })
    }
  }
  catch (err) {
    console.log("API ERROR /LOGIN GET", + err)
    return new Response("There is error at authenticating your cookie", { status: 500 })
  }
}
