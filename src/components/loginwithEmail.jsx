import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";


export default function LoginWithEmail(){

    const sendLogin = () => {

    };

    return (
        <div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>
                        Login to your account 
                    </CardTitle>
                    <CardDescription>
                        Enter the following email and password, or continue with your discord account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={sendLogin}>
                        <div>
                            <Label>Email</Label>
                            <Input id="email" type="email" placeholder="@gmail.com" required/>
                        </div>
                        <div>
                            <Label>Password</Label>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button type="sumbit" className="w-full">Login</Button>
                </CardFooter>
            </Card>
        </div>
    );
}