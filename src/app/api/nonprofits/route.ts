// app/api/nonprofits/route.ts
import { NextResponse } from "next/server";

const API_BASE_URL = "https://partners.every.org/v0.2";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export async function GET(request: Request) {
  if (!apiKey) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  const url = new URL(request.url);
  const take = url.searchParams.get("take") || "20";
  const searchTerm = url.searchParams.get("searchTerm");
  const cause = url.searchParams.get("cause");

  try {
    let endpoint;
    let params = `?apiKey=${apiKey}&take=${take}`;

    if (searchTerm) {
      // Use search endpoint with specific term
      endpoint = `${API_BASE_URL}/search/${searchTerm}${params}`;

      if (cause) {
        params += `&causes=${cause}`;
      }
    } else if (cause) {
      // Use browse endpoint for specific cause
      endpoint = `${API_BASE_URL}/browse/${cause}${params}`;
    } else {
      // Choose a featured category randomly for variety
      const featuredCategories = [
        "animals",
        "education",
        "health",
        "environment",
        "arts",
        "disaster",
        "veterans",
      ];

      const randomCategory =
        featuredCategories[
          Math.floor(Math.random() * featuredCategories.length)
        ];
      endpoint = `${API_BASE_URL}/browse/${randomCategory}${params}`;
    }

    console.log("Fetching from:", endpoint);

    const res = await fetch(endpoint);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API Error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Error fetching API", details: error.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { error: "Error fetching API", details: "Unknown error" },
        { status: 500 },
      );
    }
  }
}
