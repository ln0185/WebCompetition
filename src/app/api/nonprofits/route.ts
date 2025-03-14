import { NextResponse } from "next/server";

const API_URL = "https://partners.every.org/v0.2/nonprofit/maps";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
/*
------------
| Data about Non |
------------
*/
export async function GET() {
  console.log("api key:", apiKey);
  if (!apiKey) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }
  try {
    const res = await fetch(`${API_URL}?apiKey=${apiKey}`);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API Error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();

    if (!data) {
    }

    return NextResponse.json({ categories: data });
  } catch (error: unknown) {
    if (error instanceof Error) {
    } else {
      return NextResponse.json(
        { error: "Error fetching API", details: "Unknown error" },
        { status: 500 },
      );
    }
  }
}

/*
-------------
 FYRIR ORGHUNTER!! DONT DELETE IF THE OTHER ONE DE-OES NOT WORK
-------------
import { NextResponse } from "next/server";

const API_URL = "https://data.orghunter.com/v1/categories";
const apiKey = process.env.NEXT_PUBLIC_ORGHUNTER_API_KEY;

export async function GET() {
  if (!apiKey) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }
  try {
    const res = await fetch(`${API_URL}?user_key=${apiKey}`);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API Error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();

    if (!data || !data.data) {
      return NextResponse.json(
        { error: "Invalid API response" },
        { status: 500 },
      );
    }

    return NextResponse.json({ categories: data.data });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching OrgHunter API", details: error.message }, // make a type for Error
      { status: 500 },
    );
  }
}*/

/*Spurja Smára
laga error lint
hjálp með þennan nýja api
hvernig er best að setja þetta upp fyrir nokkra endpoints á homepageinu
hvernig er best að vera með file structure
Er ég að nota app router eða page router? og hvernig fatta ég það
*/
