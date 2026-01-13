"use client";

import { useState, useEffect } from "react";

import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Profilecard from "@/components/profilecard";
import EmptyProfile from "@/components/empty";
import { db } from "@/lib/firebase/firebase.config";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { firebaseAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [profile, setProfile] = useState([]);
  const router = useRouter();
  const { userInfo, fireBaseloading, logOut } = firebaseAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (fireBaseloading) {
      return;
    }

    if (!userInfo) {
      setProfile([]);
      router.push("/login");
      return;
    }

    const getData = async () => {
      try {
        const refer = doc(db, "users", userInfo.uid);
        const snap = await getDoc(refer);
        if (snap.exists()) {
          const data = snap.data();
          console.log(data)
          // setNumberId(data.uid);
          const providersArray = [...(data.providers || [])];
          console.log(providersArray)
          setProfile(providersArray);
        } else {
          console.log("aaaa");
        }
      } catch (e) {
        console.log(e);
      }
    };
    if(userInfo){
      getData();
    }
  }, [userInfo, fireBaseloading, router]);

  if (fireBaseloading && loading) {
    return <h1>LOADING...</h1>;
  }
  if (!userInfo) {
    return;
  }

  return (
    <div className="flex">
      <SidebarProvider>
        <div>
          <DashboardSidebar></DashboardSidebar>
        </div>
        <main className="w-full flex flex-col">
          <SidebarTrigger>Open</SidebarTrigger>
          {profile.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full h-full">
              {profile.map((profiles) => (
                <Profilecard key={profiles.game} profile={profiles} uid={userInfo.uid}/>
              ))}
              {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
            </div>
          ) : (
            <div>
              <EmptyProfile />
            </div>
          )}
        </main>
      </SidebarProvider>
    </div>
  );
}
