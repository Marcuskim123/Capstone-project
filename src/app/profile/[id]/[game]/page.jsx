"use client"
import { db } from "@/lib/firebase/firebase.config"
import { doc, getDoc } from "firebase/firestore";
import { useParams,useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {firebaseAuth} from "@/lib/AuthContext"
import OsuProfile from "@/components/osuprofile";


export default function profilePage() {
    const { game } = useParams();
    const router = useRouter();
    const { userInfo, fireBaseloading, logOut } = firebaseAuth();
    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (fireBaseloading) {
            return;
        }

        if (!userInfo) {
            router.push("/login");
            return;
        }

        const fetchProfile = async () => {
            try {
                const ref = doc(db, "users", userInfo.uid, "profiles", game);
                const snapshot = await getDoc(ref);

                if (!snapshot.exists()) {
                    setProfile(null);
                    return;
                }

                const data = snapshot.data();
                console.log(data);
                setProfile(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

    }, [fireBaseloading, userInfo, game, router]);

    if (!profile) {
        return <h1>User not found</h1>;
    }




    return (
        <OsuProfile profileData={profile}/>
    );
};