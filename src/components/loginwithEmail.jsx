import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Index from "@/components/ui/travel-connect-signin-1";

export default function LoginWithEmail() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const sendLogin = async (e, email, password) => {
    try {
      e.preventDefault();
      setError(null);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      console.log(token);
      const userUid = userCredential.user.uid;

      const response = await fetch("api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: userUid,
          IdToken: token,
        }),
      });
      const mes = await response.json();
      console.log(mes.message);
      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err);
      console.log(`Could not authenticate the login ${err.message}`);
    }
  };

  return <Index onSubmit={sendLogin} error={error} />;
}
