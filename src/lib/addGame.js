import "server-only";
import {db} from "@/lib/firebase/admin"

export const runtime = "nodejs";


//Osu
export async function addOsuData(osuProfile,uid) {
    try {
  //   const profile = {
  //   id: osuProfile.id,
  //   username: osuProfile.username,
  //   country: osuProfile.country.code,
  //   avatar_url: osuProfile.avatar_url,
  //   cover_url: osuProfile.cover_url,
  //   playmode: osuProfile.playmode,

  //   statistics: {
  //     global_rank: osuProfile.statistics?.global_rank ?? null,
  //     pp: osuProfile.statistics?.pp ?? null,
  //     hit_accuracy: osuProfile.statistics?.hit_accuracy ?? null,
  //     play_count: osuProfile.statistics?.play_count ?? null,
  //   },
  //   lastSyncedAt: new Date(),
  // };
  const profile = osuProfile


  const provider = {
    game:"osu",
    id:osuProfile.id,
    username:osuProfile.username,
    addedAt: new Date()
  }

  const userID = uid;

  const add = db.collection('users').doc(userID)
  const setProvider = await add.set(
    {
      providers:provider
    },
    {
      merge:true
    });

  
    const saveData =  db.collection('users').doc(userID).collection('profiles').doc('osu');
    const ref = await saveData.set({
        profile,
        updatedAt: new Date()
    },{
      merge:true
    });

    console.log("user has been added to firebase");
}
catch(e){
    console.log(`ERROR WHILE SAVING OSU DATA: \n${e}`);
    return null;
}

}

