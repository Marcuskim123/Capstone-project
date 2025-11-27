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
  const [searchQuery, setSearchQuery] = useState("");
  const [profileNumb, setProfileNumb] = useState(1);
  const [profile, setProfile] = useState([
    {
      title:"profile #1",
      date:"2025-11-27",
      desciption:"My first profile here:"
    },
    {
      title:"profile #2",
      date:"2025-11-27",
      desciption:"My first profile here:"
    },
  ]);

  return (
    <div className="flex">
      <SidebarProvider>
        <DashboardSidebar></DashboardSidebar>
        <main>
          {profileNumb => (
            <SidebarTrigger>Open</SidebarTrigger>
            {profile.map((profiles) => (
              <Profilecard key={profile.title}/>
            ))};
          )}
        </main>
      </SidebarProvider>
    </div>
  );
}
