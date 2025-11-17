"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LoginWithEmail from "@/components/loginwithEmail";

export default function Login() {
  const router = useRouter()

  function routeToLogin()
  {
    router.push('login');
  }

  return (
    <div className="text-center">
      <
    </div>
  );
}
