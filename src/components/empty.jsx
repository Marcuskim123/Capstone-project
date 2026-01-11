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
import { useState } from "react";
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

function addGame(){
  return (
            <div className="space-y-2 p-2">
            <div className="group flex w-full items-center justify-between gap-4 rounded-lg border border-transparent bg-muted p-4 transition-all hover:border-primary/30 hover:translate-x-1">
              <div className="flex items-center gap-4 text-left">
                <div className="flex size-14 items-center justify-center rounded-lg bg-background transition-colors group-hover:bg-primary/20 group-hover:text-primary">
                  {/* <Icon className="h-7 w-7" /> */}
                  Icon
                </div>
                <div>
                  <p className="text-lg font-semibold leading-none">Title</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    aaa
                  </p>
                </div>
              </div>
              <div className="min-w-[100px]">
                <Button
                  variant="secondary"
                  className="h-10 w-full uppercase tracking-wider group-hover:bg-primary"
                >
                  Connect
                </Button>
              </div>
            </div>
          </div>
  )
}

export default function EmptyProfile() {
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

  return (
    <Dialog>
      <Empty className="w-full justify-center">
        <EmptyHeader>
          <EmptyTitle>No Profiles Yet</EmptyTitle>
          <EmptyDescription>
            You have made no projects yet. Start creating your first own game
            profile.
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
          <addGame/>
        </ScrollArea>

        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Info className="h-3 w-3" /> More platforms are coming soon
        </p>

        <div className="flex items-center gap-4">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Separator orientation="vertical" className="h-4" />
          <Button variant="link">Support</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
