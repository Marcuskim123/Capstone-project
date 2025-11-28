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
      id: 1,
      title: "profile #1",
      date: "2025-11-27",
      description: "My first profile here:"
    },
    {
      id: 2,
      title: "profile #2",
      date: "2025-11-27",
      description: "My first profile here:"
    },
    {
      id: 3,
      title: "profile #3",
      date: "2025-11-27",
      description: "My first profile here:"
    },
  ]);

  const getData = (e) => {

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
            <div className="grid grid-cols-4 md:grid-cols-2 gap-10 w-full h-full">
              {profile.map((profiles) => (
                <Profilecard key={profiles.id} profile={profiles} />
              ))}
              <p>adadadadad</p>
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
