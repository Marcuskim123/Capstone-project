"use client"

import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react";
import { Separator } from "@/components/ui/separator"
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import  Link  from "next/link"
export default function Profilecard({ profile }) {
  const [infoProfile, setInfoProfile] = useState(profile);

  const [bannerImage, setBannerImage] = useState(() => {
    // You can map game names to image URLs here
    const gameImages = {
      osu: "/images/new-beginnings.jpg",
      // league: "/images/league-banner.jpg",
      // valorant: "/images/valorant-banner.jpg",
    };
    return gameImages[infoProfile.game] || "";
  });

  return (

    <div className="w-full max-w-full max-h-full">
      <Link href={`/dashboard/${infoProfile.game}`} className="block">
        <Card className="group hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 transition-all overflow-hidden">
          {/* Image section reduced in height */}
          <div
            className="relative w-full h-40 bg-center bg-cover"
            style={{ backgroundImage: `url("${bannerImage}")` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="destructive"
                size="icon-sm"
                className="w-8 h-8 rounded-lg bg-destructive/50 text-white hover:bg-destructive/70"
                // onClick={}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <CardContent className="pt-3">
            <CardDescription className="text-card-foreground text-lg font-medium">{infoProfile.game}</CardDescription>
            <CardDescription className="text-muted-foreground text-base mt-2">{infoProfile.username}</CardDescription>
            {/* Extra information goes here */}
            <Separator>
            </Separator>
            <CardDescription className="text-sm">Global Rank</CardDescription>
            <CardDescription className="text-md text-muted-foreground">
              #{infoProfile.rank}
            </CardDescription>

            <CardDescription className="text-md text-muted-foreground">
              {/* {infoProfile.score ? `Score: ${infoProfile.score}` : ""} */}
            </CardDescription>
            {/* <Avatar>
            <AvatarImage src={infoProfile.avatar_url} />
            <AvatarFallback>MK</AvatarFallback>
          </Avatar> */}
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
