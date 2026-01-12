import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/lib/AuthContext";

export default function LoginWithEmail() {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [confirmation, setConfimration] = useState(false);
  const [OTP, setOTP] = useState(false);
  const [cookieInfo, setCookieInfo] = useState({});
  // const {user, fireBaseloading, logOut} = firebaseAuth();
  const router = useRouter();

  const sendLogin = async (e) => {
    try {
      e.preventDefault();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      console.log(token);
      const userUid = userCredential.user.uid;

      const response = await fetch("api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: userUid,
          IdToken: token,
        }),
      });
      const mes = await response.json();
      console.log(mes.message);
      if (response.ok) {
        router.push("/dashboard");
      }

    } catch (err) {
      setError(err);
      console.log(`Could not authenticate the login ${error}`);
    }
  };

  const checkOTP = () => {
    console.log("OTP has been sumbitted " + OTP);
    try {
    } catch (err) {}
  };

  useEffect(() => {

  },[]);


  return (
    <div className=" w-full flex justify-center">
      <Dialog>
        <Card className="flex w-full max-w-lg">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter the following email and password, or continue with your
              discord account
            </CardDescription>
            <CardAction>
              {/* <Button onClick={} variant="outline">Sign up</Button> */}
              <Link href={"/signup"} variant="outline">
                Sign up
              </Link>
            </CardAction>
          </CardHeader>
          <form onSubmit={sendLogin} className="flex w-full grid gap-3">
            <CardContent>
              <Label>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Label>Password</Label>
              <Input
                id="password"
                type="password"
                placeholder=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex grid gap-5 w-full">
              <DialogTrigger asChild>
                <Button type="sumbit" className="">
                  Login
                </Button>
              </DialogTrigger>
              <Link className="text-center max-w-lg" href={"/"}>
                Login with..
              </Link>
            </CardFooter>
          </form>
        </Card>
        {/* {confirmation && (
          <div>
            <form onSubmit={checkOTP}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter your one-time password here</DialogTitle>
                  <DialogDescription>
                    the one-time code has been sent to your email. Please enter
                    the code below.
                  </DialogDescription>
                </DialogHeader>
                <InputOTP maxLength={6}>
                  <InputOTPGroup onChange={(value) => setOTP(value)}>
                    <InputOTPSlot index={0}></InputOTPSlot>
                    <InputOTPSlot index={1}></InputOTPSlot>
                    <InputOTPSlot index={2}></InputOTPSlot>
                    <InputOTPSlot index={3}></InputOTPSlot>
                    <InputOTPSlot index={4}></InputOTPSlot>
                    <InputOTPSlot index={5}></InputOTPSlot>
                  </InputOTPGroup>
                </InputOTP>
                <DialogFooter> */}
                  {/* <DialogClose asChild> */}
                  {/* <Button type="Sumbit">Confirm</Button> */}
                  {/* </DialogClose> */}
                {/* </DialogFooter>
              </DialogContent>
            </form>
          </div>
        )} */}
      </Dialog>
    </div>
  );
}
