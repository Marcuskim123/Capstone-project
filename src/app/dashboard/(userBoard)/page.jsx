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
import { AddGameProfileDialog } from "@/components/ai-gen/createnew";

export default function Dashboard() {
  const [profile, setProfile] = useState([
    // {
    //   id: 1,
    //   title: "profile #1",
    //   date: "2025-11-27",
    //   description: "My first profile here:"
    // },
    // {
    //   id: 2,
    //   title: "profile #2",
    //   date: "2025-11-27",
    //   description: "My first profile here:"
    // },
    // {
    //   id: 3,
    //   title: "profile #3",
    //   date: "2025-11-27",
    //   description: "My first profile here:"
    // },
  ]);
  const router = useRouter();
  const { userInfo, fireBaseloading, logOut } = firebaseAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [numberId, setNumberId] = useState();

  const getProfiles = async () => {
    const refer = collection(db, "users", userInfo.uid, "profiles");

    const q = query(refer, limit(1));
    const snap = await getDocs(refer);

    if (snap.size <= 0) {
      console.log("0 doc found");
      return;
    }
    const snapshot = await getDocs(refer);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // setProfile(data);
    // console.log(profile);
  };

  //preventing unauthorized access
  useEffect(() => {
    console.log(userInfo);

    if (fireBaseloading) {
      return;
    }

    if (!userInfo) {
      router.push("/login");
      return;
    }

    const getData = async () => {
      try {
        const refer = doc(db, "users", userInfo.uid);
        // const refer = collection(db,'users');
        const snap = await getDoc(refer);
        if (snap.exists()) {
          const data = snap.data();

          setNumberId(data.uid);
          console.log();
        } else {
          console.log("aaaa");
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
    getProfiles();
  }, [userInfo, fireBaseloading, router]);

  if (fireBaseloading /*|| dataLoading*/) {
    //insert loading
    return <h1>LOADING...</h1>;
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
                <Profilecard key={profiles.id} profile={profiles} />
              ))}
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
