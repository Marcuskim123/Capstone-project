import { AuthCredential,signInWithEmailAndPassword  } from "firebase/auth";
import {auth} from "@/lib/firebase.config"

export async function POST(request) {
    try {
    const body = await request.json();
    // signInWithEmailAndPassword(auth,)
        return new Response.json({body})
    }
    catch(err){
        return new Response("There is error at authenticating", {status:500});
    }

}


