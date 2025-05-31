// app/api/pokemon/route.tsx (Server Component)
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId, pokemon, action } = await request.json();
    if (!["bookmarks", "liked"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    // Use userId directly—do NOT call useUser() here
    let user= await prisma.user.findUnique({ where: { auth0Id: userId } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          auth0Id: userId,
          email: "", // Provide a valid email or fetch from request if available
          name: "",  // Provide a valid name or fetch from request if available
          bookmarks: [],
          liked: [],
        },
      });
    }

    // Determine which field to update (bookmarks vs. liked)
    const fieldToUpdate = action === "bookmarks" ? "bookmarks" : "liked";
    const currentItems = (user as any)[fieldToUpdate] as string[];
    const toggledOff = currentItems.includes(pokemon);
    const updatedItems = toggledOff
      ? currentItems.filter((item) => item !== pokemon)
      : [...currentItems, pokemon];

    await prisma.user.update({
      where: { auth0Id: userId },
      data: { [fieldToUpdate]: updatedItems },
    });

    return NextResponse.json({
      toggledOff,
      success: true,
      message: `Successfully ${action.slice(0, -1)}ed ${pokemon}`,
    });
  } catch (error) {
    console.error("Error in POST /api/pokemon:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
