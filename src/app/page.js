"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
    const params = {
    "client_id": process.env.API_OSU_CLIENT_ID,
    "redirect_uri": "http://localhost:3000",
    "response_type": "code",
    "scope": "public identify",
    "state": "randomval",
  }
  const query = new URLSearchParams(params).toString();

 async function routeToLogin()
  {
    try{
    const response = await fetch('/api',{method:"GET",});
    const data = await response.json();
    console.log(data);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="text-center">
      <h1>New capstone Porject v1</h1>
      <h5>Click button below to begin/login</h5>
      <Button onClick={routeToLogin}>Click on the button to connect api</Button>
    </div>
  );
}
