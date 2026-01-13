"use client";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Button } from "./ui/button";
import { auth,db } from "@/lib/firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { getDoc, doc,setDoc } from "firebase/firestore"

export default function Signup() {
  const router = useRouter();
  const [ToS, setToS] = useState(false);

  const sendSignUp = async (e) => {
    try {
      e.preventDefault();
      const handleForm = new FormData(e.target);
      const email = handleForm.get("email");
      const password = handleForm.get("password");
      const confirmPassword = handleForm.get("confirmPassword");
      const username = handleForm.get("username");

      if (confirmPassword !== password) {
        console.log(password + "   " + confirmPassword);
        console.log("password do not match");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);

    const ref = doc(db, "users", userCredential.user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
      email: userCredential.user.email,
      username: username,
      createdAt: Date.now(),
      providers: [],
    })}
    router.push("/login");
    } catch (err) {
      console.log(err);
    }
}

  // const checkPassword = async (event) => {
  //   if (event.target.value == userInfo.password) {
  //     setConfirmPassword("Password is correct");
  //   } else {
  //     setConfirmPassword("Password is does not match");
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <form onSubmit={sendSignUp} className="w-full max-w-lg">
        <FieldGroup className="flex justify-center text-left">
          <FieldSet className="w-full rounded-xl border-2 border-black bg-background p-6 shadow-sm space-y-6">
            {/* Header */}
            <div className="space-y-1">
              <FieldLegend className="text-2xl font-semibold">
                Account Signup
              </FieldLegend>
              <FieldDescription className="text-sm text-muted-foreground">
                Create your account for free to continue using our service
              </FieldDescription>
            </div>

            {/* Form Fields */}
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input
                  name="username"
                  type="text"
                  placeholder="KnockKnock11"
                  required
                />
                <FieldDescription></FieldDescription>
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
                <FieldDescription>
                  Password must be at least 8 characters long
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="••••••••"
                  required
                  name="confirmPassword"
                />
                <FieldDescription>
                  {/* password match message */}
                </FieldDescription>
              </Field>
            </FieldGroup>

            <FieldSeparator />

            {/* Terms & Submit */}
            <FieldGroup className="space-y-6">
              <Field>
                <FieldLabel className="text-sm font-medium">
                  Terms of Service
                </FieldLabel>

                <Field
                  orientation="horizontal"
                  className="flex items-center gap-3"
                >
                  <Checkbox
                    id="terms"
                    required
                    onCheckedChange={(checked) => setToS(checked)}
                  />
                  <FieldLabel htmlFor="terms" className="text-sm">
                    I agree to the Terms of Service
                  </FieldLabel>
                </Field>
              </Field>

              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
