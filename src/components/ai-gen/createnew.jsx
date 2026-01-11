import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Info, X, Gamepad2, Cloud, Joystick, Boxes } from "lucide-react"

// Platform item component
function PlatformRow({ icon: Icon, title, description, onConnect }) {
  return (
    {/*
    <button asChild
      className="group flex w-full items-center justify-between gap-4 rounded-lg border border-transparent bg-muted p-4 transition-all hover:border-primary/30 hover:translate-x-1"
      onClick={onConnect}
      type="button"
    >
      <div className="flex items-center gap-4 text-left">
        <div className="flex size-14 items-center justify-center rounded-lg bg-background transition-colors group-hover:bg-primary/20 group-hover:text-primary">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-lg font-semibold leading-none">{title}</p>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {description}
          </p>
        </div>
      </div>
      <div className="min-w-[100px]">
        <Button
          variant="secondary"
          className="h-10 w-full uppercase tracking-wider group-hover:bg-primary group-hover:text-primary-foreground"
        >
          Connect
        </Button>
      </div>
    </button>
    */}
  )
}

export function AddGameProfileDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        {/* Header */}
        <DialogHeader className="flex-row items-start justify-between gap-4 border-b p-6">
          <div>
            <DialogTitle className="text-2xl">
              Add New Game Profile
            </DialogTitle>
            <DialogDescription>
              Link your external accounts to sync games and achievements.
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>

        {/* Scrollable content */}
        <ScrollArea className="max-h-[60vh] p-2">
          <div className="space-y-2 p-2">
            <PlatformRow
              icon={Cloud}
              title="Steam"
              description="Connect your Steam library and achievements."
            />
            <PlatformRow
              icon={Gamepad2}
              title="Xbox Live"
              description="Sync your Xbox Game Pass and profile stats."
            />
            <PlatformRow
              icon={Joystick}
              title="Nintendo Switch"
              description="Import your Nintendo Switch play history."
            />
            <PlatformRow
              icon={Boxes}
              title="Epic Games"
              description="Link your Epic store catalog and friends."
            />
          </div>
        </ScrollArea>

        <Separator />

        {/* Footer */}
        <DialogFooter className="flex items-center justify-between gap-4 p-6">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="h-3 w-3" /> More platforms coming soon
          </p>
          <div className="flex items-center gap-4">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Separator orientation="vertical" className="h-4" />
            <Button variant="link">Support</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
