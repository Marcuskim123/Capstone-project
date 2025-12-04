"use client"
import {use} from "react";
import { useParams } from "next/navigation";

export default function profilePage({params}) {
    const { slug } = use(params);
    return (
        <div>
            <h1>{slug}</h1>
        </div>        
    );
};