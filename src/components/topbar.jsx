"use client"


import { Bell, Mail, Search, UserPlus, MessageCircle, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage,AvatarFallback } from "@/components/ui/avatar";

export default function Topbar() {

  return (
<div className="w-full h-14 px-4 flex items-center relative border-b">
  {/* Centered search */}
  <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-xl">
    <div className="relative hidden md:block">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        className="pl-8 w-full"
        placeholder="Search players"
      />
    </div>
  </div>

  {/* Right actions */}
  <div className="ml-auto flex items-center gap-3">
    <Button variant="ghost">Sign up</Button>

    <Avatar>
      <AvatarImage src="/profile.jpg" />
      <AvatarFallback>MK</AvatarFallback>
    </Avatar>
  </div>
</div>
  );
}
