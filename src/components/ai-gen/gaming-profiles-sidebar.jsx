"use client"

import Link from "next/link"
import { LayoutDashboard, Settings, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function GamingProfilesSidebar() {
  return (
    <aside className="flex flex-col w-64 bg-background border-r border-border p-4">
      <div className="flex h-full min-h-[700px] flex-col justify-between">
        <div className="flex flex-col gap-6">
          {/* Logo Section */}
          <div className="flex gap-3 items-center px-2">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCufNgknLDQ5cdpPjv42u5hEdTPCLwxdsMWn9yjdVPHGhH4ClDNDnRteR-9_42NhYHPLdjx7u5MZdGbeeuHrzbv1JgNUAkKxZYMn7FpekfLb5GauUcmQ-MLDuFQJ991yV3eovYx6V8v3LgePL1AuJv0ncoJxkZzLhY_eFJ2w1umBuzhVRBwdKDtC3GcMUguDIuZpfCwvBx8a2HMwfg3kRh7M2HQja8DnNA3Dio7K7LeqDrzX7kYg1fr3HjxF6g62LQ9iX8dr6-ZTJsQ")'
              }}
            />
            <div className="flex flex-col">
              <h1 className="text-foreground text-base font-medium leading-normal">GamePro</h1>
              <p className="text-muted-foreground text-sm font-normal leading-normal">Profile Manager</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <Link 
              href="#" 
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/20 text-primary"
              )}
            >
              <LayoutDashboard className="size-5" />
              <p className="text-sm font-medium leading-normal">Dashboard</p>
            </Link>
            <Link 
              href="#" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
            >
              <Settings className="size-5" />
              <p className="text-sm font-medium leading-normal">Settings</p>
            </Link>
            <Link 
              href="#" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
            >
              <HelpCircle className="size-5" />
              <p className="text-sm font-medium leading-normal">Help</p>
            </Link>
          </nav>
        </div>

        {/* User Section */}
        <div className="flex flex-col gap-1 border-t border-border pt-4">
          <div className="flex items-center gap-3 px-3 py-2">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8" 
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCSwrzEcInoYZsMA4_q8O0X3JaG8uuwOX9o5UWpMbgiOmI4CE1UnVMeGGmSg5mHkv8nzzghWOcTpCcGydtVWa1ssXBf3jXCrMAUgxxwObr5k8l2erEQD8WiIEzF7zk-B_HrCokcKB-opzi9mA0kSmKMWJeLIaawGs5JCBoHlICaTmFzxUOykJzScbr--q85FognZlD7ujyOr9JLdpGSZukDmegAVXfkBHzgUWgzFi6yX8PMwV5cVxDsYPVeXUnmMVtKThOaGPcCNyBb")'
              }}
            />
            <p className="text-foreground text-sm font-medium leading-normal">Alex Mercer</p>
          </div>
          <Link 
            href="#" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
          >
            <LogOut className="size-5" />
            <p className="text-sm font-medium leading-normal">Logout</p>
          </Link>
        </div>
      </div>
    </aside>
  )
}


