// import { cookies } from "next/headers";
// import "server-only";
// export const runtime = "nodejs";

// const firebase_session_token = process.env.CLIENT_SESSION_KEY;

// export default async function createSession(expireTime) {
//   try {
//     const expiresAt = Date.now() + expireTime;

//     // Whenever a user is accessing restricted content that requires authentication.
//     const sessionCookie = (await cookies().get("session")) || "";

//     // Verify the session cookie. In this case an additional check is added to detect
//     // if the user's Firebase session was revoked, user deleted/disabled, etc.
//     const verifySession = auth.verifySessionCookie(sessionCookie, false)

//       .then((decodedClaims) => {
//         serveContentForUser("/profile", req, res, decodedClaims);
//       })
//       .catch((error) => {
//         // Session cookie is unavailable or invalid. Force user to login.
//         res.redirect("/login");
//       });
//   } catch (e) {
//     return e;
//   }
// }
