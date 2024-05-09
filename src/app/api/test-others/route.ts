import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    items: [
      {
        id: "b40f3c92-a0ee-4be7-993a-38b15055dd73",
        title: "Problem Solving Using A3",
        location: "General Santos City",
        dateFrom: "2024-04-04T00:00:00.000Z",
        dateTo: "2024-04-04T00:00:00.000Z",
        category: "conference",
      },
      {
        id: "560c8de2-b5a8-42bd-9b32-2dce1b7688de",
        title: "Advanced Plumbing Techniques and Technology Training",
        dateFrom: "2024-03-22T00:00:00.000Z",
        dateTo: "2024-03-22T00:00:00.000Z",
        location: "Koronadal City",
        category: "convention",
      },
      {
        id: "b4cd7282-8599-417e-8aac-73ec1d1f0340",
        title: "Advanced Plumbing Techniques and Technology Training",
        dateFrom: "2024-04-19T00:00:00.000Z",
        dateTo: "2024-04-19T00:00:00.000Z",
        location: "Tacurong City, Sultan Kudarat",
        category: "meeting",
      },
      {
        id: "112257fa-617c-4302-adb3-0c26379396be",
        title: "Physical Training",
        dateFrom: "2024-03-04T00:00:00.000Z",
        dateTo: "2024-03-08T00:00:00.000Z",
        location: "Cagayan de Oro, Misamis Oriental",
        category: "orientation",
      },
      {
        id: "821ff522-8f16-46f2-a596-f0d9ef62ad19",
        title: "Comprehensive Mental Health and Well-being Training",
        dateFrom: "2024-04-04T00:00:00.000Z",
        dateTo: "2024-04-04T00:00:00.000Z",
        location: "Valencia City, Bukidnon",
        category: "seminar",
      },
    ],
  });
}
