import { AuthCredential, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "@/lib/firebase.config"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export async function POST(request) {
    try {
        const { email, password } = await request.json();
        // const req = await request.FormData();
        // const email = req.get("email");
        // const password = req.get("password");
        const userCredential = await signInWithEmailAndPassword(auth,email,password)
        const signedUser = userCredential.user.uid;
        console.log(userCredential);

        return Response.json({
            message:`You have been login to ${signedUser}`,
            user:signedUser,
        });
    }
    catch(e){
        console.log("API ERROR " + e);
        return new Response("There is error at authenticating please try again", {status:500});
    }

}

export async function GET(req) {
    return Response.json("GET called");
}


