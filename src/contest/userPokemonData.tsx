import { useState, useEffect } from "react";
import axios from "axios";

const pokemonBaseUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokemonSpeciesUrl = "https://pokeapi.co/api/v2/pokemon-species/";
const pokemonAbilityUrl = "https://pokeapi.co/api/v2/ability/";
const pokemonTypeUrl = "https://pokeapi.co/api/v2/type/";
const pokemonNatureUrl = "https://pokeapi.co/api/v2/nature/";
const pokemonMoveUrl = "https://pokeapi.co/api/v2/move/";
const pokemonStatUrl = "https://pokeapi.co/api/v2/stat/";
const pokemonColorUrl = "https://pokeapi.co/api/v2/pokemon-color/";
const pokemonHabitatUrl = "https://pokeapi.co/api/v2/pokemon-habitat/";



export const usePokemonData = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState([]);
  const [pokemonAbilityData, setPokemonAbilityData] = useState([]);
  const [pokemonTypeData, setPokemonTypeData] = useState([]);
  const [pokemonNatureData, setPokemonNatureData] = useState([]);
  const [pokemonMoveData, setPokemonMoveData] = useState([]);
  const [pokemonStatData, setPokemonStatData] = useState([]);
  const [pokemonColorData, setPokemonColorData] = useState([]);
  const [pokemonHabitatData, setPokemonHabitatData] = useState([]);
  const [loading, setLoading] = useState(false);

 const fetchPokemon= async (page = 1) => { 
  setLoading(true);
  try {
    const offset = (page - 1) * 50;
    const res = await axios.get(`${pokemonBaseUrl}/pokemon?limit=50&offset=${offset}`);
    
  
    const data = await res.data;
    setLoading(false);
    console.log("Pokemon data:", data);
    return data;
  } catch (error) {
    setLoading(false);
    console.error("Error fetching Pokemon data:", error);
      return null;
      }
 };
  useEffect(() => {
    fetchPokemon();
  }, []);
  
    return {
      pokemonData,
      pokemonSpeciesData,
      pokemonAbilityData,
      pokemonTypeData,
      pokemonNatureData,
      pokemonMoveData,
      pokemonStatData,
      pokemonColorData,
      pokemonHabitatData,
      loading,
      fetchPokemon,
    };
  }
 