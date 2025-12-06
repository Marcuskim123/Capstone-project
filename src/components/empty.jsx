"use client"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { Button } from "./ui/button";
import Router from "next/router";
import { Label } from "./ui/label";

export default function EmptyProfile() {
    const router = Router;

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
          <Button>Create new profile</Button>
          <Label></Label>
        </div>
      </EmptyContent>
    </Empty>
  );
}
