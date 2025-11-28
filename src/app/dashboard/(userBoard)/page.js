"use client";

import { useState } from "react";
import { Plus, Search, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DashboardSidebar,
  GamingProfilesSidebar,
} from "@/components/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Profilecard from "@/components/profilecard";


export default function GamingProfilesPage() {

  const [profile, setProfile] = useState([
    {
      id:1,
      title: "profile #1",
      date: "2025-11-27",
      desciption: "My first profile here:"
    },
    {
      id:2,
      title: "profile #2",
      date: "2025-11-27",
      desciption: "My first profile here:"
    },
    {
      id:3,
      title: "profile #3",
      date: "2025-11-27",
      desciption: "My first profile here:"
    },
  ]);

  return (
    <div className="flex">
      <SidebarProvider>
        <DashboardSidebar></DashboardSidebar>
        <main>
          {profile.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SidebarTrigger>Open</SidebarTrigger>
              {profile.map((profiles) => (
                <Profilecard key={profiles.id} profile={profiles}/>
              ))};
            </div>
          ) : (
            <div>
              {/* Insert no profile, start new */}
            </div>
          )}
        </main>
      </SidebarProvider>
    </div>
  );
}
