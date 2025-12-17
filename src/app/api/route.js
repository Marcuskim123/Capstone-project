// EX for header of fetch query
// const myHeaders = new Headers();
// myHeaders.append();
// myHeaders.append();

// EX for url search Params

// const urlencoded = new URLSearchParams();
// urlencoded.append("client_id", process.env.OSU_CLIENT_ID);
// urlencoded.append("client_secret", process.env.OSU_CLIENT_SECRET);
// urlencoded.append("grant_type", "client_credentials");
// urlencoded.append("scope", "public");

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: urlencoded,
//   redirect: "follow"
// };

export async function GET() {
  try {
    return Response.json({ message: "Hello World" });
  }
  catch (err) {
    console.log(err);
  }
}



