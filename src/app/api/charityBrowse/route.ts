import { NextResponse } from "next/server";

const API_URL = "https://partners.every.org/v0.2/browse/animals";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

/*
------------------------------------------------------------
| Returns NonProfits Associated with a given Cause |
------------------------------------------------------------
*/
export async function GET() {
  console.log("api key:", apiKey);
  if (!apiKey) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }
  try {
    const res = await fetch(`${API_URL}?apiKey=${apiKey}&take=10`); //Can search for alot by

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API Error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();

    if (!data) {
      return NextResponse.json(
        { error: "Invalid API response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ categories: data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Error fetching API", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Error fetching API", details: "Unknown error" },
        { status: 500 }
      );
    }
  }
}

/*
-------------
 FYRIR ORGHUNTER!! DONT DELETE IF THE OTHER ONE DOES NOT WORK
-------------


import { NextResponse } from "next/server";

const API_URL = "https://data.orghunter.com/v1/charitybasic";
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
}
*/
