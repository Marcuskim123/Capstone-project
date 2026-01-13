"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  async function routeToLogin(endpoint) {
    try {
      // const response = await fetch('/api',{method:"GET"});
      // const data = await response.json();
      // console.log(JSON.stringify(data));
      router.push(endpoint);
    } catch (err) {
      console.log(err);
    }
  }

  return (  
    <div className="flex items-center justify-center text-center">
      <div className="w-full max-w-md space-y-6 text-left">
      <h1>capstone Porject Final version</h1>
      <h2>
        Prerequisite for testing the app: Email, Cookie allowed, and Osu game
        account
      </h2>
      <h5>Click button below to sign up/login</h5>
      <Button
        onClick={() => {
          routeToLogin("/login");
        }}
      >
        Click on the button to login page
      </Button>
      <Button onClick={() => {
          routeToLogin("/signup");
        }}>Click on the button to Signup page</Button>
      </div>
    </div>
  );
}
