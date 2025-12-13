import { AuthCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase.config"
import { cookies } from "next/headers";



export async function POST(request) {
    try {
        const { email, password } = await request.json();
        // const req = await request.FormData();
        // const email = req.get("email");
        // const password = req.get("password");
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const signedUser = userCredential.user.uid;
        const token = await userCredential.user.getIdToken();
        const refToken = userCredential.user.refreshToken;  

        return new Response(
            JSON.stringify({
                message: `You have been login to ${signedUser}`,
                user: signedUser,
                email: userCredential.user.email,

            }),
            {
                status: 200,
                headers: {
                    "Content-Type":"application/json",
                    "Set-Cookie":`IdToken=${token}`
                }

            });



    }
    catch (e) {
        console.log("API ERROR " + e);
        return new Response("There is error at authenticating please try again", { status: 500 });
    }

}

export async function GET(req) {
    return Response.json("GET called");
}


