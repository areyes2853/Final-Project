import axios from "axios";
import { useState } from "react"
import { POST } from "../app/route/page"

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
      await axios.post("/route", {
        id,
        pokemon: _pokema,
        action,
      });
      
      //  return {id, pokemon: _pokema, action}; // Removed to match void return type
    } catch (error) {
      console.error("Error in performAction:", error);
    }
  };

  const userInfo = user
    ? {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        pokemon: user.pokemon,
        emailVerified: user.emailVerified,
      }
    : null;

  return {userDetails, performAction, userInfo};
};