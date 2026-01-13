'use server'
import { NextResponse } from "next/server";
import { adminAuth, db } from "@/lib/firebase/admin";
import { checkSessionCookie } from "@/lib/session";
import { addOsuData } from "@/lib/addGame";
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
        client_id: process.env.NEXT_PUBLIC_API_OSU_CLIENT_ID,
        client_secret: process.env.API_OSU_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri:
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/newgame/osu`,
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      throw new Error(errText);
    }

    const tokenData = await tokenRes.json();
    // console.log(`Oauth token response: \n${tokenData}`);
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

    const bestScoreParams = {
      "mode": "osu",
      "limit": "10",
      // "offset": "1",
    };

    const osuUser = await userRes.json();
    // TODO: save user + token in DB / session / JWT
    const url = new URL(`https://osu.ppy.sh/api/v2/users/${osuUser.id}/scores/best`);
    Object.keys(bestScoreParams)
      .forEach(key => url.searchParams.append(key, bestScoreParams[key]));

    const bestScores = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
    const topScore = await bestScores.json();
    // console.log(topScore);

    //check usersession in admin sdk
    const user = await checkSessionCookie()
    // console.log(user);

    if (!user) {
      const response = NextResponse.next();
      return NextResponse.redirect(
        new URL("/login")
      );

    }

    const checkupload = await addOsuData(osuUser, topScore, user.uid);

    if (!checkupload) {
      return NextResponse.json(
        { error: "OAuth callback failed" },
        { status: 500 }
      );
    }
    // Redirect back to frontend
    return NextResponse.redirect(
      new URL("/dashboard", process.env.NEXT_PUBLIC_BASE_URL)
    );

  } catch (err) {

    console.error(err);
    return NextResponse.json(
      { error: "OAuth callback failed" },
      { status: 500 }
    )
  }
}


export async function DELETE(req) {
  try {
    const { target, uid, } = await req.json()
    const cookie = await checkSessionCookie();

    if (!cookie) {
      return NextResponse.json(
        { error: "DELETE FAILED" },
        { status: 500 }
      )
    }

    if (target == "osu" && cookie.uid == uid) {
      const realUid = cookie.uid;
      await db.collection("users").doc(realUid).collection("profiles").doc(target).delete();
      // await db.collection("users").doc(realUid).update({
      //   [`providers.${target}`]: adminAuth.firestore.FieldValue.delete(),
      // })


      const userRef = db.collection("users").doc(realUid)
      const snap = await userRef.get()

      if (!snap.exists) {
        throw new Error("User not found")
      }

      const data = snap.data()
      const providers = data?.providers ?? []

      const filteredProviders = providers.filter(
        (p) => p.game !== "osu"
      )

      await userRef.update({
        providers: filteredProviders,
      })
    }

    return NextResponse.json({
    },{status:200})
  }
  catch (e) {
    console.log(e);
    return NextResponse.json({ Deleted:false,error: "DELETE FAILED" }, { status: 500 });
  }
}
