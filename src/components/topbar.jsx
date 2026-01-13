"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "@/lib/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase.config";
import { useEffect, useState } from "react";

export default function Topbar() {
  const router = useRouter();
  const { userInfo, fireBaseloading, logOut } = firebaseAuth();
  const [username, setUsername] = useState("");

  const getUsername = async () => {
    const ref = doc(db, "users", userInfo.uid);
    const snap = await getDoc(ref);
    setUsername(snap.data());
  };

  useEffect(() => {
    if (fireBaseloading) {
      return;
    }

    if (userInfo) {
      getUsername();
    }

  }, [userInfo, fireBaseloading, router]);

  return (
    <div className="w-full h-14 px-4 flex items-center relative border-b">
      {/* Centered search */}
      <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-xl">
        <div className="relative hidden md:block">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-8 w-full" placeholder="Search players" />
        </div>
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            logOut();
            router.push("/login");
          }}
        >
          Sign Out
        </Button>

        <Avatar className="h-12 w-12 sm:h-20 sm:w-20 lg:h-28 lg:w-28">
          <AvatarImage />
          <AvatarFallback>{username.username}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
