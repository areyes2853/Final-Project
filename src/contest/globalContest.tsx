import { User } from "lucide-react";
import React from "react";
import { usePokemonData } from "./userPokemonData";


type GlobalContestContextType = {
  loading: boolean;
  fetchPokemon: () => void;
};

const GlobalContest = React.createContext<GlobalContestContextType>({
  loading: false,
  fetchPokemon: () => {},
});

export const GlobalContestProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { loading, fetchPokemon } = usePokemonData();
  console.log("GlobalContestProvider");

  return (
    <GlobalContest.Provider value={{ loading, fetchPokemon }}>
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