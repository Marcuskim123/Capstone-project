import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "./ui/button";

export default function Popup() {
  return (
      <Dialog>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogContent>
          <InputOTP>
            <InputOTPGroup>
              <InputOTPSlot index={0}></InputOTPSlot>
              <InputOTPSlot index={1}></InputOTPSlot>
              <InputOTPSlot index={2}></InputOTPSlot>
              <InputOTPSlot index={3}></InputOTPSlot>
              <InputOTPSlot index={4}></InputOTPSlot>
              <InputOTPSlot index={5}></InputOTPSlot>
            </InputOTPGroup>
          </InputOTP>
        </DialogContent>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Confirm</Button>
            <Button>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </Dialog>
  );
}
