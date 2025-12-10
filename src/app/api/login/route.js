import { AuthCredential, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth,  } from "firebase/auth";
import {auth} from "@/lib/firebase.config"


export async function POST(request) {
    try {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        const signedUser = null;

        signInWithEmailAndPassword( auth,email,password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })

        if(signedUser== null) {
            return new Response.json("Error")
        }

        return Response.json({
            message:`You have been login to ${user}`,
            user: signedUser
        })

    }
    catch(e){
        return new Response("There is error at authenticating please try again", {status:500});
    }

}

export async function GET(req) {
    return Response.json("GET called");
}


