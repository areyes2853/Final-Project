import { prisma } from "@/db/prisma"
import { auth0 } from "@/lib/auth0"
import { NextRequest, NextResponse } from "next/server"
import { json } from "stream/consumers"


export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  
  try {
    const { userId } = params;


    if (!userId) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 })
    }
    const user = await prisma.user.findUnique({
      where: { auth0Id: userId },
    })
      
      if (!user) {
        return NextResponse.json({message: "user not found"},{status:400})
        
      }
    return NextResponse.json(user);
    
  } catch (error) {
    console.log("error in linking or bookmarking", error)
    return NextResponse.json(
      { message: "Error in linking or Bookmarking" },
      { status: 500 }
    )
  }

}