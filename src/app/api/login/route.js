import "server-only";
import { checkSessionCookie, createSession } from '@/lib/session'
export async function POST(request) {
  try {

    const { displayName, uid, IdToken } = await request.json();
    console.log(`username: ${displayName}\n userID: ${uid} \n IdToken: ${IdToken}`);
    // login process to firebase
    createSession(IdToken);
    //send response
    return new Response(
      JSON.stringify({
        message:"cookie has been set successfully",
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

    if (cookie) {
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
