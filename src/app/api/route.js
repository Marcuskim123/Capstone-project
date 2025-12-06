"use server"


export async function GET() {
    return Response.json({message:"Hello World"})
}

// export async function POST(req) {
//     const {message} = await req.json()
//     const result = await 
    
// }

// const connect = await fetch("https://osu.ppy.sh/api/v2/",{
//     method:"POST",
//     headers:"",
//     body:"",
// });


const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();
urlencoded.append("client_id", process.env.OSU_CLIENT_ID);
urlencoded.append("client_secret", process.env.OSU_CLIENT_SECRET);
urlencoded.append("grant_type", "client_credentials");
urlencoded.append("scope", "public");

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
  redirect: "follow"
};

export async function connection() {
    return connect = fetch("https://osu.ppy.sh/oauth/token", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
