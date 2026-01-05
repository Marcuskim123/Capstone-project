import { cookies } from "next/headers";
import "server-only";
import { adminAuth } from "@/lib/firebase/admin";
import { redirect, RedirectType } from "next/navigation";

export const runtime = "nodejs";

export async function checkSessionCookie() {
  try {
    // Whenever a user is accessing restricted content that requires authentication.
    const sessionCookie = (await cookies().get("session")) || "";
    if (!sessionCookie) {
      return null;
    }
    // Verify the session cookie. In this case an additional check is added to detect
    // if the user's Firebase session was revoked, user deleted/disabled, etc.
    try {

      const verifySession = adminAuth.verifySessionCookie(sessionCookie, true);
      const decodedClaims = await verifySession.decodedClaims
      console.log(verifySession);
      return await verifySession;

    } catch (err) {

      return null;
    }

  } catch (e) {
    console.log("SESSION ERROR/NOT FOUND: ", e);
    return null;
  }
}

export async function createSession(userToken) {
  const bakeCookies = await cookies();  
  const token = userToken;
  //bakes cookie for login
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie = await adminAuth.createSessionCookie(token, { expiresIn: expiresIn })
  bakeCookies.set("session", sessionCookie, {
    maxAge: expiresIn / 1000, // seconds (Next.js expects seconds)
    httpOnly: true,
    secure: true,
  });

  const check = await adminAuth.verifySessionCookie(sessionCookie);
  console.log(check);

}
