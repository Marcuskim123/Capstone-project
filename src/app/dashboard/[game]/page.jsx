"use client"
import { db } from "@/lib/firebase/firebase.config"
import { doc, getDoc } from "firebase/firestore";
import { useParams,useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {firebaseAuth} from "@/lib/AuthContext"

export default function profilePage() {
    const { game } = useParams();
    const router = useRouter();
    const { userInfo, fireBaseloading, logOut } = firebaseAuth();
    const [profile, setProfile] = useState();



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
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold capitalize">{game} Profile</h1>

            <div className="rounded-lg border p-4">
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>ID:</strong> {profile.id}</p>
                {profile.rank && <p><strong>Rank:</strong> {profile.rank}</p>}
            </div>
        </div>
    );
};