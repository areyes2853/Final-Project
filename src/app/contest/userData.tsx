import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import { useEffect, useState } from "react";


type UserDetails = {
  bookmarks: string[];
  liked: string[];
  // add other properties as needed
};

export const useUserData = () => {
  const { user } = useUser();
  // Removed invalid handler() call; not usable in client-side code

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
 

  const fetchUserDetails = async () => {
    if (!user) return;

    try {
      const res = await axios.get(`/api/user/${user.sub}`);
      // console.log("Response from /api/user:", res.data);
      setUserDetails(res.data);
      if (!res.data) {
        console.log("No user details found");
        return;
      }
      setUserDetails(res.data);
      // console.log("User details fetched successfully:", res.data);
    } catch (error) {
      console.log("Error in fetchUserDetails", error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, [user]);
  // console.log("useUserData", user, userDetails);

  const performAction = async (userId: any, pokemon: any, action: string) => {
    try {
      setUserDetails((prev) => {
        if (!prev) return prev; // or return a default value if needed

        const updatedBookmarks =
          action === "bookmark"
            ? prev.bookmarks.includes(pokemon) // Is it already bookmarked?
              ? prev.bookmarks.filter((p) => p !== pokemon) // if yes then remove it
              : [...prev.bookmarks, pokemon] // if no then add it
            : prev.bookmarks; // no change in bookmarks

        const updatedLikes =
          action === "like"
            ? prev.liked.includes(pokemon) // Is it already liked?
              ? prev.liked.filter((p) => p !== pokemon) // if yes then remove it
              : [...prev.liked, pokemon] // if no then add it
            : prev.liked; // no change in likes

        return {
          ...prev,
          bookmarks: updatedBookmarks,
          liked: updatedLikes,
        };
      });

      await axios.post("/api/pokemon", {
        userId,
        pokemon,
        action,
      });
    } catch (error) {
      console.log("Error in performAction", error);
      fetchUserDetails(); // when error, fetch the user details again
    }
  };

  return { userDetails, performAction, fetchUserDetails };
};
