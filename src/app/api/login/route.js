import "server-only";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "@/lib/firebase/firebase.config"
import {createSession} from '@/lib/session'
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
    // const bakeCookies = await cookies()
    
    // //bakes cookie for login
    // const expiresIn = 60 * 60 * 24 * 5 * 1000;
    // const sessionCookie =  await adminAuth.createSessionCookie(token, {expiresIn:expiresIn})
    // bakeCookies.set("session", sessionCookie, {
    //   maxAge: expiresIn / 1000, // seconds (Next.js expects seconds)
    //   httpOnly: true,
    //   secure: true,
    // });

    // const check = await adminAuth.verifySessionCookie(sessionCookie);
    // console.log(check);



    //send response
    return new Response(
      JSON.stringify({
        message: `You have been login to ${signedUser} and cookie has been set`,
        user: signedUser,
        uid:userUid,
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

