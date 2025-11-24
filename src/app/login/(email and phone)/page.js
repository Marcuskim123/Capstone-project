"use client"
import { useRouter } from "next/navigation";
import LoginWithEmail from "@/components/loginwithEmail";
import Popup from "@/components/loginpopup";
export default function Login() {
  const router = useRouter()

  function routeToLogin()
  {
    router.push('login');
  }

  return (
    <div>
      <LoginWithEmail/>
    </div>
  );
}
