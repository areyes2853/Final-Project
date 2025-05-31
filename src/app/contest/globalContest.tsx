"use client";
import { User } from "lucide-react";
import React, { useEffect } from "react";
import { usePokemonData } from "./userPokemonData";
import { useUserData } from "./userData";
import { useUser } from "@auth0/nextjs-auth0";
// import { console } from "inspector";

type GlobalContestContextType = {
  loadMore: () => void;
  loading: boolean;
  fetchPokemon: () => void;
  pokemonListDetails: any[];
  pokemonList: any[];
  fetchPokemonDetailsByName: (name: string) => Promise<any>;
  activePokemon?: any;
  userDetails?: any; // Replace 'any' with the actual type if available
  performAction?: (
    userId: string,
    _pokema: string,
    action: "liked" | "bookmark"
  ) => Promise<any>;
  fetchUserDetails: (id: any) => Promise<void>;

  // Replace 'any' with the actual type if available
  // Replace 'any[]' with the actual type if available
};

const GlobalContest = React.createContext<GlobalContestContextType>({
  loading: false,
  pokemonListDetails: [],
  loadMore: () => {},
  fetchPokemon: () => {},
  fetchPokemonDetailsByName: async (name: string) => Promise.resolve(),
  pokemonList: [],
  activePokemon: undefined,
  performAction: async (
    userId: string,
    _pokema: string,
    action: "liked" | "bookmark"
  ) => Promise.resolve(),
  userDetails: undefined,
  fetchUserDetails: async (userId: any) => Promise.resolve(), // Initialize with a no-op async function
  // Initialize with a no-op function
});

export const GlobalContestProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { user } = useUser();
  const {
    loadMore,
    loading,
    fetchPokemon,
    pokemonListDetails,
    pokemonList,
    fetchPokemonDetailsByName,
    activePokemon,
  } = usePokemonData();
  const { userDetails, performAction, fetchUserDetails } = useUserData();
  console.log("GlobalContestProvider", userDetails, user, performAction);

console.log("WHO is the user", userDetails);

  useEffect(() => {
    if (user) fetchUserDetails();

    // console.log("user:", user);
  }, [user]);

  return (
    <GlobalContest.Provider
      value={{
        loadMore,
        loading,
        fetchPokemon,
        pokemonListDetails,
        pokemonList,
        fetchPokemonDetailsByName,
        activePokemon,
        performAction,
        userDetails,
        fetchUserDetails,
      }}
    >
      {children}
    </GlobalContest.Provider>
  );
};
export const useGlobalContest = () => {
  return React.useContext(GlobalContest);
};
