"use server"

import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/admin";
import { checkSessionCookie } from "@/lib/session";
// TODO 

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json(
      { error: "Authorization failed", details: error },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  try {
    // Exchange code for access token
    const tokenRes = await fetch("https://osu.ppy.sh/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.API_OSU_CLIENT_ID,
        client_secret: process.env.API_OSU_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri:
          "http://localhost:3000/api/newgame/osu",
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      throw new Error(errText);
    }

    const tokenData = await tokenRes.json();
    console.log(`Oauth token response: \n${tokenData}`);
    /**
     * tokenData example:
     * {
     *   access_token,
     *   refresh_token,
     *   expires_in,
     *   token_type
     * }
     */

    // OPTIONAL: fetch osu user info
    const userRes = await fetch("https://osu.ppy.sh/api/v2/me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const osuUser = await userRes.json();
    console.log(osuUser);
    // TODO: save user + token in DB / session / JWT

    const userId = await checkSessionCookie().uid;
    const saveData = db.collection('users').doc(userId).collection('profile');

    // Redirect back to frontend
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    );

  } catch (err) {

    console.error(err);
    return NextResponse.json(
      { error: "OAuth callback failed" },
      { status: 500 }
    );
  }
}