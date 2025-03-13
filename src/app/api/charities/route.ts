import { NextResponse } from "next/server";

const API_URL = "https://orghunter.3scale.net/";
const API_KEY = "8fd2d30788135b0bc7bd22af69db05e7";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json(
      { error: "Missing charity name" },
      { status: 400 }
    );
  }

  const query = {
    query: `
      query GetCharity($name: String!) {
        CHC {
          getCharities(filters: { search: $name }) {
            list(limit: 1) {
              id
              names {
                value
              }
              activities
              finances {
                income {
                  latest {
                    total
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { name },
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API Error: ${res.status} - ${errorText}`);
    }

    const { data, errors } = await res.json();

    if (errors) {
      return NextResponse.json(
        { error: "Error fetching charity data", details: errors },
        { status: 500 }
      );
    }

    const charity = data?.CHC?.getCharities?.list?.[0];

    if (!charity) {
      return NextResponse.json({ error: "Charity not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: charity.names?.[0]?.value || "Unknown Charity",
      description: charity.activities || "No description available",
      spending: {
        latestIncome: charity.finances?.income?.latest?.total || 0,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching CharityBase API", details: error.message },
      { status: 500 }
    );
  }
}
