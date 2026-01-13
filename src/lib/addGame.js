import "server-only";
import { db, arrayUnion } from "@/lib/firebase/admin"
import { it } from "node:test";
const admin = require("firebase-admin");


export const runtime = "nodejs";


//Osu
export async function addOsuData(osuProfile, bestScore ,uid) {
  try {
    const profile = {
      id: osuProfile.id,
      username: osuProfile.username,
      country: osuProfile.country,
      avatar_url: osuProfile.avatar_url,
      cover_url: osuProfile.cover_url,
      playmode: osuProfile.playmode,
      rank_history: osuProfile.rank_history,
      statistics: osuProfile.statistics,
      monthly_playcounts: osuProfile.monthly_playcounts
    };
    // console.log(profile);
    // const profile = osuProfile
    const topScore = bestScore.map(item => (
      { 
        id: item.id, 
        accuracy: item.accuracy,
        best_id: item.best_id,
        created_at:item.created_at,
        mods: item.mods || [],
        pp: item.pp,
        rank: item.rank,
        score:item.score,
        max_combo: item.max_combo,
        beatmap:{
          beatmapset_id:item.beatmap.beatmapset_id,
          difficulty_rating:item.beatmap.difficulty_rating,
        },
        beatmapset: {
          artist:item.beatmapset.artist,
          card: item.beatmapset.covers.card,
          title:item.beatmapset.title
        }
      }));
    console.log(topScore)


    const provider = {
      game: "osu",
      id: profile.id,
      username: profile.username,
      rank: osuProfile.statistics.global_rank,
      avatar_url: profile.avatar_url,
      addedAt: new Date()
    }

    // console.log(provider);
    const userID = uid;

    const add = db.collection('users').doc(userID)
    const userDoc = await db.collection('users').doc(userID).get();
    let existingProviders = userDoc.data()?.providers || [];

    const alreadyExists = existingProviders.some(p => p.game === "osu" && p.id === profile.id);

    if (!alreadyExists) {
      await add.set(
        {
          providers: admin.firestore.FieldValue.arrayUnion({
            game: "osu",
            id: profile.id,
            username: profile.username,
            rank: profile.statistics_rulesets?.osu?.global_rank || 0,
            avatar_url: profile.avatar_url,
            addedAt: new Date()
          })
        },
        { merge: true }
      );
    }
    else{return null;}

    const saveData = db.collection('users').doc(userID).collection('profiles').doc('osu');
    const ref = await saveData.set({
      profile,
      topScore,
      updatedAt: new Date()
    }, {
      merge: true
    });

    console.log("user has been added to firebase \n\n");
    return true;
  }
  catch (e) {
    console.log(`ERROR WHILE SAVING OSU DATA: \n${e}`);
    return null;
  }

}

