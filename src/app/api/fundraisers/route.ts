import { NextResponse } from "next/server";

const API_URL = "https://partners.every.org/v0.2";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export async function GET(request: Request) {
  console.log("api key:", apiKey);
  if (!apiKey) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  const url = new URL(request.url);
  const take = url.searchParams.get("take") || "24";

  try {
    // Use the search endpoint to get multiple nonprofits
    // Try different search terms to get more variety
    const searchTerms = [
      "education",
      "animals",
      "health",
      "environment",
      "poverty",
    ];
    const randomTerm =
      searchTerms[Math.floor(Math.random() * searchTerms.length)];

    const res = await fetch(
      `${API_URL}/search/${randomTerm}?apiKey=${apiKey}&take=${take}`
    );

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

    return NextResponse.json(data);
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
