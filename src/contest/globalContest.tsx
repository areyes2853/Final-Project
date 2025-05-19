import { User } from "lucide-react";
import React from "react";
import { usePokemonData } from "./userPokemonData";


type GlobalContestContextType = {
  loading: boolean;
  fetchPokemon: () => void;
  pokemonListDetails: any[]; // Replace 'any[]' with the actual type if available
};

const GlobalContest = React.createContext<GlobalContestContextType>({
  loading: false,
  pokemonListDetails: [],
  fetchPokemon: () => {},
});

export const GlobalContestProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { loading, fetchPokemon,pokemonListDetails } = usePokemonData();
  console.log("GlobalContestProvider");

  return (
    <GlobalContest.Provider value={{ loading, fetchPokemon,pokemonListDetails }}>
      {children}
    </GlobalContest.Provider>
  );
}
export const useGlobalContest = () => {
  const context = React.useContext(GlobalContest);
  if (!context) {
    throw new Error("useGlobalContest must be used within a GlobalContestProvider");
  }
  return context;
};