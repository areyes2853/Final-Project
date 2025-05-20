import axios from "axios";
import { useState } from "react";
// REMOVE THIS LINE: import { POST } from "../app/route/page"; // <--- DELETE THIS LINE

interface UserDetails {
  // Define the shape of userDetails here if known, otherwise use any
  [key: string]: any;
}

export const useUserData = (user: any) => {
  const [userDetails, setUserDetails] = useState(null);

  const performAction = async (
    id: string,
    _pokema: string,
    action: string
  ): Promise<any> => {
    try {
      // Ensure this matches your actual API route path
      // Based on your earlier context, your API route is at /api/contest/route.ts
      await axios.post("/api", {
        id,
        pokemon: _pokema,
        action,
      });

      // You might want to refresh userDetails here after a successful action
      // For example, if adding a bookmark updates the user's bookmarks array
      // on the server, you'd want to refetch or update the local state.
      // This part would depend on how your 'userDetails' state is meant to be populated.
    } catch (error) {
      console.error("Error in performAction:", error);
      // Consider throwing the error or returning a specific status to the caller
      // so the component calling performAction can handle success/failure.
      throw error; // Re-throw to propagate the error if needed
    }
  };

  const userInfo = user
    ? {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        pokemon: user.pokemon, // Make sure 'pokemon' actually exists on your Auth0 user object or specify its source
        emailVerified: user.emailVerified,
      }
    : null;

  // You are returning userInfo, but your GlobalContestProvider is only destructuring userDetails and performAction.
  // If you intend to use userInfo in GlobalContestProvider, you'll need to destructure it there.
  // Currently, `userDetails` here is always `null` as `setUserDetails` is never called.
  // You might want to set `userDetails` to `userInfo` if that's its purpose.
  return { userDetails, performAction, userInfo };
};
