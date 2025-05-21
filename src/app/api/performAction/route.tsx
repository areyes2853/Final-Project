import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

export async function POST(request: NextRequest) {
  try {
    const { id, pokemon, action } = await request.json();

    // Validate action: must match your Prisma fields
    if (!["bookmarks", "liked"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    // Find or create the user
    let user = await prisma.user.findUnique({
      where: { auth0Id: id },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          auth0Id: id,
          email: "",
          name: "",
          bookmarks: [],
          liked: [],
        },
      });
    }

    // Determine which field to update
    const fieldToUpdate = action === "bookmarks" ? "bookmarks" : "liked";

    // Toggle logic
    const currentItems = (user as any)[fieldToUpdate] as string[];
    const toggledOff = currentItems.includes(pokemon);
    const updatedItems = toggledOff
      ? currentItems.filter((item) => item !== pokemon)
      : [...currentItems, pokemon];

    // Persist update
    await prisma.user.update({
      where: { auth0Id: id },
      data: { [fieldToUpdate]: updatedItems },
    });

    return NextResponse.json(
      {
        toggledOff,
        success: true,
        message: `Successfully ${action}ed ${pokemon}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST request for Bookmark/Like:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
