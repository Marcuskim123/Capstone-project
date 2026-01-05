import { NextRequest } from "next/server";

// TODO fix requesting Oauth into account
export async function newOsuAuth(req) {
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

