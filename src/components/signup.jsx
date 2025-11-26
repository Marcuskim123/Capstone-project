"use client"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {useState} from "react";
import { Button } from "./ui/button";


export default function Signup() {

    const [confirmPassword, setConfirmPassword] = useState("");
    const [ToS, setToS] = useState(false);
    const [userInfo, setUserInfo] = useState({
        email:"",
        username:"",
        password:"",
    });
    const [checkUsername, setCheckUsername] = useState("");


    const sendSignUp = async (e) => {
        e.preventDefault();
        const handleForm = new FormData(e.target);
        setEmail(handleForm.get('email'));
        setPassword(handleForm.get('password'));

        try {
            console.log(Tos);
        }
        catch(err) {
            console.log(err);
        }
    };

    const checkPassword = async (event) => {
        if (event.target.value == userInfo.password) {
            setConfirmPassword("Password is correct");
        }
        else{
            setConfirmPassword("Password is does not match")
        }
        
    }


  return (
    <div className="w-full grid">
      <form onSubmit={sendSignUp}>
        <FieldGroup className="flex w-full justified-center text-left">
          <FieldSet>
            <FieldLegend>Account Signup</FieldLegend>
            <FieldDescription>Create your for free to continue using our service</FieldDescription>
            <FieldGroup className="max-w-lg">
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input name="email" type="email" placeholder="Example@email.com" required />
              </Field>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input type="text" placeholder="ex. KnockKnock11" required />
                <FieldDescription>{checkUsername}</FieldDescription>
              </Field>
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input name="password" type="password" placeholder="•••••••" required/>
                <FieldDescription>Password must be atleast 8 letters long</FieldDescription>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input type="password" placeholder="•••••••" required onChange={checkPassword}/>
                <FieldDescription>{}</FieldDescription>
              </Field>
            </FieldGroup>
            <FieldSeparator></FieldSeparator>
            <FieldGroup className="flex flex-col gap-6">
                <FieldLabel>Terms of Service</FieldLabel>
                <Field orientation="horizontal" className="flex items-center gap-3">
                    <Checkbox required id="terms" onChange={(e) => setToS(e.target.value)}/>
                    <FieldLabel>I agree to terms of service</FieldLabel>
                </Field>
                <Field>
                    <Button type="submit">Sumbit</Button>
                </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
