"use client"

import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function GamingProfileCard({ profile }) {
  const { name, game, bannerImage } = profile

  return (
    <div className="group flex flex-col gap-3 pb-3 rounded-lg bg-card border border-border overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10">
      <div className="relative w-full bg-center bg-no-repeat aspect-[4/3] bg-cover" style={{ backgroundImage: `url("${bannerImage}")` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon-sm"
            className="size-8 rounded-lg bg-white/10 text-white hover:bg-white/20"
          >
            <Edit className="size-4" />
          </Button>
          <Button 
            variant="destructive" 
            size="icon-sm"
            className="size-8 rounded-lg bg-destructive/50 text-white hover:bg-destructive/70"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
      <div className="px-4 -mt-4">
        <p className="text-card-foreground text-base font-medium leading-normal">{name}</p>
        <p className="text-muted-foreground text-sm font-normal leading-normal">{game}</p>
      </div>
    </div>
  )
}
