"use client"

import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react";
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Profilecard({ profile, uid }) {
  const router = useRouter();
  const [infoProfile, setInfoProfile] = useState(profile);
  const Useruid = uid;
  const [deletes, setDeletes] = useState(false);
  const [bannerImage, setBannerImage] = useState(() => {
    // You can map game names to image URLs here
    const gameImages = {
      osu: "/images/new-beginnings.jpg",
      // league: "/images/league-banner.jpg",
      // valorant: "/images/valorant-banner.jpg",
    };
    return gameImages[infoProfile.game] || "";
  });

  const deleteData = async () => {

    const response = await fetch("api/newgame/osu", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target: infoProfile.game,
        uid: Useruid,
      }),
    });
    if (response.ok) {
    window.location.reload()
    }
  }

  return (

    <div className="w-full max-w-full max-h-full">
      <AlertDialog open={deletes} onOpenChange={setDeletes}>

        <Link href={`/dashboard/${infoProfile.game}`} className="block">
          <Card className="group hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 transition-all overflow-hidden">
            {/* Image section reduced in height */}
            <div
              className="relative w-full h-40 bg-center bg-cover"
              style={{ backgroundImage: `url("${bannerImage}")` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="icon-sm"
                    className="w-8 h-8 rounded-lg bg-destructive/50 text-white hover:bg-destructive/70"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDeletes(true);
                    }}
                  >


                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteData}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
