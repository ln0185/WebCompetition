import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json(
      { error: "Missing charity name" },
      { status: 400 }
    );
  }

  // Fetch charities
  const charities = [
    {
      name: "Red Cross",
      description: "Helping people worldwide",
      spending: { programs: 70, admin: 20, fundraising: 10 },
    },
  ];

  const charity = charities.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );

  if (!charity) {
    return NextResponse.json({ error: "Charity not found" }, { status: 404 });
  }

  return NextResponse.json(charity);
}
