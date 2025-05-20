import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

export async function POST(request: NextRequest) { 
  try { 
    const {id,pokemon,action } = await request.json();
    // TODO: implement Bookmark logic here
    if (!["bookmark", "like"].includes(action)) { 
      return Response.json({ message: "Invalid action" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { auth0Id: id } });
    if (!user) { 
      const newUser = await prisma.user.create({ data: { auth0Id: id,bookmarks:[],liked:[] } });
    }

    // determine if the action is to bookmark or like
    const fieldToUpdate = action === "bookmark" ? "bookmarks" : "liked";
    const currecntItem = id[fieldToUpdate];
      // toggle the action
    let updateitems = currecntItem.filter((item: string) => item !== pokemon);
    if (updateitems.length === currecntItem.length) {
      // if the item was not found, add it to the list
      updateitems = [...currecntItem, pokemon];
    }
    // update the user in the database
    await prisma.user.update({
      where: { auth0Id: id },
      data: { [fieldToUpdate]: updateitems },
    });
    return Response.json(
      { 
        tpggleOff: currecntItem.includes(pokemon),
        message: `Successfully ${action}ed ${pokemon}`
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST request for Bookmark:", error);
    return Response.json("Internal Server Error", { status: 500 });
  }
}

// export async function Linking(request: NextRequest) { 
//   try { 
//     // TODO: implement Linking logic here
//     return Response.json({ message: "Linking sucessfull" }, { status: 200 });
//   } catch (error) {
//     console.error("Error in POST request for Linking:", error);
//     return Response.json("Internal Server Error", { status: 500 });
//   }
// }