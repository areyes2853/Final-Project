"use server"
import { NextRequest, NextResponse } from "next/server";

// export async function pokemonData( pokemon: string) {
//   const pokemonData = PokemonCard.get();import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import { useUser } from "@auth0/nextjs-auth0";

export async function POST(request: NextRequest) {
  try {
    const { id, pokemon, action } = await request.json(); // 'id' here is expected to be auth0Id

    // 1. Input Validation and Security
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { message: "Invalid user ID provided" },
        { status: 400 }
      );
    }
    if (!pokemon || typeof pokemon !== "string") {
      return NextResponse.json(
        { message: "Invalid pokemon name provided" },
        { status: 400 }
      );
    }
    if (!["bookmark", "liked"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    // 2. Find or Create User (Corrected Logic)
    // We need to fetch the user to get their current bookmarks/likes
    let user = await prisma.user.findUnique({
      where: { auth0Id: id },
      // Explicitly select the fields you need. If not selecting, Prisma might pick defaults
      // or try to select all, which could cause the 'email' error if your schema doesn't have it.
      select: {
        id: true, // Prisma's internal ID
        auth0Id: true,
        email:true,
        name:true,
        emailVerified:true,
        bookmarks: true,
        liked: true,
        // If you ever add email/name to schema, you can select them here:
        // email: true,
        // name: true,
      },
    });

    if (!user) {
      const { user: authUser } = useUser();
      // If user doesn't exist, create them with initial empty arrays
      user = await prisma.user.create({
        data: {
          auth0Id: id,
          bookmarks: [],
          liked: [],
          email: authUser?.email ?? "", // Replace with actual email if available, fallback to empty string
          name: authUser?.name ?? "", // Replace with actual name if available, fallback to empty string
        },
        select: {
          // Select the fields you need from the newly created user
          id: true,
          auth0Id: true,
          bookmarks: true,
          liked: true,
          name: true,
          email: true,
          emailVerified: true,
        },
      });
    }

    // 3. Determine Field to Update
    const fieldToUpdate = action === "bookmark" ? "bookmarks" : "liked";

    // 4. Get Current Items Safely and Toggle Logic
    // CRITICAL FIX: You were trying to access `id[fieldToUpdate]`.
    // `id` is the auth0Id string. You need to use the `user` object you just fetched/created.
    const currentItems = user[
      fieldToUpdate as "bookmarks" | "liked"
    ] as string[]; // Type assertion for safety

    let updatedItems: string[];
    let toggledOff: boolean;

    if (currentItems.includes(pokemon)) {
      // If the item exists, remove it (toggle off)
      updatedItems = currentItems.filter((item: string) => item !== pokemon);
      toggledOff = true;
    } else {
      // If the item was not found, add it to the list (toggle on)
      updatedItems = [...currentItems, pokemon];
      toggledOff = false;
    }

    // 5. Update the User in the Database
    await prisma.user.update({
      where: { auth0Id: id },
      data: { [fieldToUpdate]: updatedItems }, // Use the calculated updatedItems
    });

    return NextResponse.json(
      // Use NextResponse for consistency
      {
        toggledOff: toggledOff, // Use the correct variable name 'toggledOff'
        message: `Successfully ${toggledOff ? "un" : ""}${action}ed ${pokemon}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST request for Bookmark/Like:", error);
    // Be more specific with error handling if possible (e.g., Prisma errors)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    ); // Use NextResponse
  }
}
