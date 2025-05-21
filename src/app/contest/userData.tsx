"user client"

import { auth0 } from "@/lib/auth0";
// src/contest/userData.ts
import axios from "axios";
import { useState, useEffect } from "react"; // Added useEffect for better state management

interface UserDetails {
  [key: string]: any; // You should ideally define more specific types here based on your User model
}

export const useUserData = (user: any) => {
  // 'user' is the Auth0 user profile
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);


  const performAction = async (
    id: string, // Renamed parameter to be clearer it's the user ID (auth0Id)
    pokemonName: string, // Renamed for clarity
    action: "liked" | "bookmarks" // Enforce allowed actions
  ): Promise<any> => {
    
    try {
      // CORRECTED: URL should be /api/contest
      // CORRECTED: Payload key should be 'id'
       await axios.post("/api/performAction", {
        id, // Send as 'id' to match API route
        pokemon: pokemonName,
        action,
      });

    
     

      
    } catch (error) {
      console.error("Error in performAction:", error);
      // Re-throw the error so it can be caught by the component
    }
  };

  // userInfo is now largely redundant if userDetails state is managing it
  // and userDetails is the one being passed to context.
  // If you only need it as a temporary derived value, it's fine.
  // But if `userDetails` state is meant to hold the user info, then you should rely on that.
  return { userDetails, performAction }; // Removed userInfo from return as userDetails state is fulfilling that role
};
