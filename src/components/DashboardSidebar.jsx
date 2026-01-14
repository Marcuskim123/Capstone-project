"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Settings, HelpCircle, LogOut, Sparkles } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { firebaseAuth } from "@/lib/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase.config";

export function DashboardSidebar() {
  const router = useRouter();
  const { userInfo, fireBaseloading, logOut } = firebaseAuth();
  const [userData, setUserData] = useState(null);

  const menuItem = [
    { 
      title: "Dashboard", 
      link: "/dashboard",
      icon: LayoutDashboard
    },
  ];

  const footerItems = [
    {
      title: "Settings",
      icon: Settings,
      onClick: () => {
        // Add settings navigation if needed
        console.log("Settings clicked");
      }
    },
    {
      title: "Help",
      icon: HelpCircle,
      onClick: () => {
        // Add help navigation if needed
        console.log("Help clicked");
      }
    },
    {
      title: "Logout",
      icon: LogOut,
      onClick: async () => {
        await logOut();
        router.push("/login");
      }
    }
  ];

  useEffect(() => {
    if (fireBaseloading || !userInfo) {
      return;
    }

    const getUserData = async () => {
      try {
        const ref = doc(db, "users", userInfo.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUserData(snap.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, [userInfo, fireBaseloading]);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-3 px-2 py-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={userInfo?.photoURL || ""} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {userData?.username ? getInitials(userData.username) : getInitials(userInfo?.displayName || userInfo?.email || "User")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0 flex-1">
                <p className="text-sm font-semibold truncate">
                  {userData?.username || userInfo?.displayName || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userInfo?.email || ""}
                </p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2 px-2 py-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Capstone Project
                </span>
              </SidebarGroupLabel>
              {menuItem.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.link} className="flex items-center gap-2">
                        {Icon && <Icon className="w-4 h-4" />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarGroup>
              <Separator className="mb-2" />
              {footerItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      onClick={item.onClick}
                      className="w-full justify-start"
                    >
                      {Icon && <Icon className="w-4 h-4 mr-2" />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarGroup>
          </SidebarFooter>
        </Sidebar>
    </div>
  );
}
