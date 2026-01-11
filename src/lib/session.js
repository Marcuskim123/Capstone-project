import { cookies } from "next/headers";
import "server-only";
import { adminAuth } from "@/lib/firebase/admin";

export const runtime = "nodejs";

export async function checkSessionCookie() {
  try {
    // Whenever a user is accessing restricted content that requires authentication.
    const cookie = await cookies()
    const sessionCookie = cookie.get("session")?.value || "";

    if (!sessionCookie) {
      return null;
    }
    // Verify the session cookie. In this case an additional check is added to detect
    // if the user's Firebase session was revoked, user deleted/disabled, etc.
    try {
      const verifySession = await adminAuth.verifySessionCookie(
        sessionCookie,
        true
      );
      // const decodedClaims = verifySession.uid;
      
      return verifySession;
    } catch (err) {
      return null;
    }
  } catch (e) {
    console.log("SESSION ERROR/NOT FOUND: ", e);
    return null;
  }
}

export async function createSession(userToken) {
  try {
    console.log("AAAAAAA")
    const bakeCookies = await cookies();
    const token = userToken;
    //bakes cookie for login
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(token, {
      expiresIn: expiresIn,
    });
    bakeCookies.set("session", sessionCookie, {
      maxAge: expiresIn / 1000, // seconds (Next.js expects seconds)
      httpOnly: true,
      secure: true,
    });
    return true;
    // console.log(check);
  } catch (e) {
    console.log(e);
    return false;
  }
}
