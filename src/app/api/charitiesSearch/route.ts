import { NextResponse } from "next/server";

type ErrorType = { error: string; details: { error: { message: string } } };

const API_URL = "https://partners.every.org/v0.2/search/humans"; //change the endpoint to things like humans, pets.....
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
/*
------------------------------------
|| Search Through the charities ||
------------------------------------
*/
export async function GET() {
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
      return NextResponse.json(
        { error: "Invalid API response" },
        { status: 500 },
      );
    }

    return NextResponse.json({ categories: data });
  } catch (error: unknown) {
    const typedError = error as ErrorType;
    return NextResponse.json(
      {
        error: "Error fetching API",
        details: typedError.details.error.message,
      },
      { status: 500 },
    );
  }
}

/*
----------------
|  ORGHUNTER  |
----------------
import { NextResponse } from "next/server";

const API_URL = "https://data.orghunter.com/v1/charitysearch";
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
