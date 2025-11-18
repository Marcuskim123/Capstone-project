import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useContext } from "react";

export default function LoginWithEmail() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  // const [sumbitStatus, setSumbitStatus] = useState(false);

  const sendLogin = () => {
    try {
      console.log(email);
    } catch (err) {
      setError(err);
      console.log(`Could not authenticate the login ${error}`);
    }
  };

  return (
    <Card className="w-full max-w-sm flex">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter the following email and password, or continue with your discord
          account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={sendLogin}>
          <div>
            <Label>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              id="password"
              type="password"
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="sumbit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
