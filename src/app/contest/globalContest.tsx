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
    id: string,
    _pokema: string,
    action: "liked" | "bookmarks"
  ) => Promise<any>;
  fetchUserDetails: () => void;

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
    id: string,
    _pokema: string,
    action: "liked" | "bookmarks"
  ) => Promise.resolve(),
  userDetails: undefined,
  fetchUserDetails: () => {}, // Initialize with undefined
  // Initialize with a no-op function
});

export const GlobalContestProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
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
  const { userDetails, performAction, fetchUserDetails } = useUserData(
    user?.sub
  );
  console.log("GlobalContestProvider");

  useEffect(() => {
    if (user?.sub) fetchUserDetails();
console.log("fetchuserdatils",user)
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
  const context = React.useContext(GlobalContest);
  if (!context) {
    throw new Error(
      "useGlobalContest must be used within a GlobalContestProvider"
    );
  }
  return context;
};
