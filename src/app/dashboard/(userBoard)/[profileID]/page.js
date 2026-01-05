"use client"
import { use, useContext } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase/firebase.config"
import { doc, getDoc } from "firebase/firestore";


export default async function profilePage({ params }) {
    const { id } = use(params);

    const ref = doc(db, "users", useContext(userinfo));
    const snap = await getDoc(ref);
    
    if (!snap.exists()) {
        return <h1>User not found</h1>;
    }


    return (
        <div>
            <h1>player Info</h1>
            <h2></h2>
        </div>
    );
};