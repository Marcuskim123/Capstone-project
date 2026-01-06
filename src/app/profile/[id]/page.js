"use client"

import { getDoc } from "firebase/firestore";
import { app } from "@/lib/firebase/firebase.config"

export default function SearchUser({params}){
    const {uid} = use(params);

    getDoc
    return (
        <h1>view player</h1>
    );
}