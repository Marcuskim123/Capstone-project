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

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
  redirect: "follow"
};

export async function GET() {
  try {
    // return connect =  await fetch("https://osu.ppy.sh/oauth/token", requestOptions)
    // .then((response) => response.text())
    // .then((result) => console.log(result))
    // .catch((error) => console.error(error));
    return Response.json({ message: "Hello World" });
  }
  catch (err) {
    console.log(err);
  }
}

export async function newOsuAuth() {
  const params = {
    "client_id": process.env.API_OSU_CLIENT_ID,
    "redirect_uri": "http://localhost:3000",
    "response_type": "code",
    "scope": "public identify",
    "state": "randomval",
  }
  const query = new URLSearchParams(params).toString();
  // use this if it doesnt work
  // Object.keys(params)
  // .forEach(key => url.searchParams.append(key, params[key]));


  // this is for actual fetch respone P.S. it calls for invalid client authorisation
  
  const response = await fetch(`https://osu.ppy.sh/oauth/authorize/${query}`, {
    method: "GET",
  }).then(response => response.json());
}

export async function getNewTokenOsu(params) {
  const header = new Headers[
    {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }];

  const response = await fetch('https://osu.ppy.sh/oauth/token', {
    headers:header,
    body: "",

  });
}
