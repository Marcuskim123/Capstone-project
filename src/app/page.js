"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  function routeToLogin()
  {
    router.push('login');
  }

  return (
    <div className="text-center">
      <h1>New capstone Porject v1</h1>
      <h5>Click button below to begin/login</h5>
      <Button onClick={routeToLogin}>Click here to start</Button>
    </div>
  );
}
