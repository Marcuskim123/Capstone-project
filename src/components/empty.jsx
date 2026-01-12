"use client";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Info, X, Gamepad2, Cloud, Joystick, Boxes } from "lucide-react";


const newGame = async () => {
  try {
    //required url for the
    const params = {
      client_id: process.env.NEXT_PUBLIC_API_OSU_CLIENT_ID,
      redirect_uri: "http://localhost:3000/api/newgame/osu",
      response_type: "code",
      scope: "public identify",
      state: "randomval",
    };

    //embed params into url
    const query = new URLSearchParams(params).toString();

    // redirect user to osu OAuth page
    window.location.href = `https://osu.ppy.sh/oauth/authorize?${query}`;
  } catch (e) {
    console.log("There has been error while trying to add the game");
  }
};


function AddGame({ title, description, img }) {
  return (
    <div className="space-y-2 p-2">
      <div className="group flex w-full items-start justify-between gap-4 rounded-lg border border-transparent bg-muted p-4 transition-all hover:border-primary/30 hover:translate-x-1">
        <div className="flex items-start gap-4 text-left">

          {/* ICON */}
          <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-background transition-colors group-hover:bg-primary/20 group-hover:text-primary">
            <img src={img}/>
          </div>

          {/* TEXT */}
          <div className="min-w-0">
            <p className="text-lg font-semibold leading-tight break-words">
              {title}
            </p>
            <p className="text-sm text-muted-foreground break-words">
              {description}
            </p>
          </div>
        </div>

        <div className="min-w-[50px]">
          <Button
            variant="secondary"
            className="h-10 w-full text-xs uppercase tracking-wider transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:hover:bg-primary"
            onClick={newGame}
          >
            Connect
          </Button>
        </div>
      </div>
    </div>

  )
}

function ComingSoon() {
  return (
    <div className="space-y-2 p-2">
      <div className="group flex w-full items-start justify-between gap-4 rounded-lg border border-transparent bg-muted p-4 transition-all hover:border-primary/30 hover:translate-x-1">
        <div className="flex items-start gap-4 text-left">
          <div className="min-w-0">
            <p className="text-lg font-semibold leading-tight break-words">
              Coming Soon
            </p>
            <p className="text-sm text-muted-foreground break-words">
              Future connectable game will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default function EmptyProfile() {

  return (
    <Dialog>
      <Empty className="w-full justify-center">
        <EmptyHeader>
          <EmptyTitle>No Profiles Yet</EmptyTitle>
          <EmptyDescription>
            You have made no profile connections yet. Start connecting your first game
            profile by pressing button below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div>
            <DialogTrigger asChild>
              <Button>Create new profile</Button>
            </DialogTrigger>
            <Label></Label>
          </div>
        </EmptyContent>
      </Empty>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add new game profile</DialogTitle>
          <DialogDescription>Select the game you want to add</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] p-2">
          <AddGame title="Osu" description="free-to-play PC rhythm game where players click circles with music" img="/osuimg.png"/>
          <ComingSoon/>
        </ScrollArea>


        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Info className="h-3 w-3" /> More platforms are coming soon
        </p>
        <div className="flex items-center gap-4">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
