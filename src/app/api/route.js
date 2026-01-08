"use server"
import { checkSessionCookie } from "@/lib/session";

export async function GET() {
  try {
    const check =checkSessionCookie();
    return Response.json({ message: check});
  }
  catch (err) {
    console.log(err);
  }
}



