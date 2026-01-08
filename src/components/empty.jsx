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
      console.log("There has been error trying to add the game")
    }
  };

  return (
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
          <Button onClick={newGame}>Create new profile</Button>
          <Label></Label>
        </div>
      </EmptyContent>
    </Empty>
  );
}
