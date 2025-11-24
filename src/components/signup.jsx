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


export default function Signup() {
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ToS, setToS] = useState(false);
    const [BoD, setBoD] = useState("");


    const sendSignUp = () => {
        console.log("Signup!");
        try {

        }
        catch(e) {
            console.log(e); 
        }
    };


  return (
    <div className="w-full grid">
      <form>
        <FieldGroup className="flex w-full justified-center text-left">
          <FieldSet>
            <FieldLegend>Account Signup</FieldLegend>
            <FieldDescription>Create your for free to continue using our service</FieldDescription>
            <FieldGroup className="max-w-lg">
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" placeholder="Example@email.com" required/>
              </Field>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input type="text" placeholder="ex. KnockKnock11" required/>
              </Field>
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input type="password" placeholder="•••••••" required/>
                <FieldDescription>Password must be atleast 8 letters long</FieldDescription>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input type="password" placeholder="•••••••" required/>
                <FieldDescription>{}</FieldDescription>
              </Field>
            </FieldGroup>
            <FieldSeparator></FieldSeparator>
            <FieldGroup className="flex flex-col gap-6">
                <FieldLabel>Terms of Service</FieldLabel>
                <Field orientation="horizontal" className="flex items-center gap-3">
                    <Checkbox required id="terms"/>
                    <FieldLabel>I agree to terms of service and follow while use of the service</FieldLabel>
                </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
