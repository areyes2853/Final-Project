import { NextApiRequest, NextApiResponse } from "next";
import { auth0 } from "@/lib/auth0"; // Adjust path if needed
import { prisma } from "@/db/prisma";
import { useUser } from "@auth0/nextjs-auth0";
import { PagesRouterRequest } from "@auth0/nextjs-auth0/types";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";



// Removed duplicate GET handler to resolve duplicate identifier error

export const POST = async (req: Request) => {
  // Implement your POST handler logic or delegate to auth0 if available
  return new Response("POST not implemented", { status: 501 });
};


// Removed duplicate GET handler to resolve duplicate identifier error


export async function GET() {
  const session = await auth0.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await auth0.updateSession({
    ...session,
    updatedAt: Date.now(),
  });

  return NextResponse.json(null, { status: 200 });
}

export async function callback(
  req: PagesRouterRequest | NextRequest,
  res: { redirect: (arg0: string) => void }
) {
  try {
    const { user } = useUser(); // Get Auth0 session user

    const user1 = await auth0.getSession();

    if (user1 && user?.sub) {
      // Check if user already exists in your database
      let existingUser = await prisma.user.findUnique({
        where: { auth0Id: user.sub },
      });

      if (!existingUser) {
        // If not, create a new user record
        existingUser = await prisma.user.create({
          data: {
            auth0Id: user1.user.sub,
            email: user1.user.email ?? "", // Make sure email exists in Auth0 user object
            name: user1.user.name ?? "", // Make sure name exists
            // other fields as needed, e.g., emailVerified
          },
        });
        console.log("New user created in DB:", existingUser.auth0Id);
        return user1; // Return the user object or handle as needed
      } else {
        console.log("Existing user found in DB:", existingUser.auth0Id);
        // You might want to update user details here if they change in Auth0
      }
    }
  } catch (error) {
    console.error("Error in login callback:", error);
  }
  // Continue with Auth0's standard callback or redirect as needed
  res.redirect("/"); // Or wherever your app should go after login
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = useUser();
  if (req.method === "GET") {
    const { auth0Id } = req.query; // This will be the user.sub from your client

    if (!auth0Id || typeof auth0Id !== "string") {
      return res.status(400).json({ message: "Missing or invalid auth0Id" });
    }

    try {
      const userdb = await prisma.user.findUnique({
        where: {
          auth0Id: user?.sub, // Use the auth0Id from the URL
        },
        select: {
          // Select only the fields you need to send to the client
          id: true,
          auth0Id: true,
          email: true,
          name: true,
          bookmarks: true,
          liked: true,
          // ... any other fields you want to expose
        },
      });

      if (!userdb) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(userdb);
    } catch (error) {
      console.error("Error fetching user details:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
