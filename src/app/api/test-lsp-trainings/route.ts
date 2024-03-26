import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    items: [
      { id: "1", title: "Problem Solving Using A3", from: "01-23-2023", to: "01-23-2023", rating: 4 },
      {
        id: "2",
        title: "Advanced Plumbing Techniques and Technology Training",
        from: "02-05-2023",
        to: "02-05-2023",
        rating: 3,
      },
      {
        id: "3",
        title: "Advanced Plumbing Techniques and Technology Training",
        from: "06-01-2023",
        to: "06-02-2023",
        rating: 5,
      },
      { id: "4", title: "Physical Training", from: "07-04-2023", to: "07-05-2023", rating: 4 },
      { id: "5", title: "Random Sheez", from: "07-24-2023", to: "07-24-2023", rating: 5 },
    ],
  });
}
