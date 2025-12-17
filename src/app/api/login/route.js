import "server-only";
import { createSessionCookie, signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";
import {auth} from "@/lib/firebase/firebase.config"
import { adminAuth } from '@/lib/firebase/admin';
export const runtime = "nodejs";

export async function POST(request) {
  try {

    
    const { email, password } = await request.json();
    // login process to firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const signedUser = userCredential.user.uid;
    const token = await userCredential.user.getIdToken();
    const refToken = userCredential.user.refreshToken

    
    //bakes cookie for login
    const bakeCookies = cookies();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const cookie2Bake =  await adminAuth.createSessionCookie(token, {expiresIn,})
    const session = bakeCookies.set("session", cookie2Bake, {
      maxAge: expiresIn / 1000, // seconds (Next.js expects seconds)
      httpOnly: true,
      secure: true,
    });

    //send response
    return new Response(
      JSON.stringify({
        message: `You have been login to ${signedUser} and cookie has been set`,
        user: signedUser,
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

export async function GET(req) {
  // var admin = require("firebase-admin");

  // var serviceAccount = require("path/to/serviceAccountKey.json");

  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  // });

  return Response.json("GET called");
}
