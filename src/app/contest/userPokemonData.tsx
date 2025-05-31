import { useState, useEffect } from "react";
import axios, { all } from "axios";

const pokemonBaseUrl = "https://pokeapi.co/api/v2/";
const pokemonSpeciesUrl = "https://pokeapi.co/api/v2/pokemon-species/aegislash";
const pokemonAbilityUrl = "https://pokeapi.co/api/v2/ability/battle-armor";
const pokemonTypeUrl = "https://pokeapi.co/api/v2/type/3";
const pokemonNatureUrl = "https://pokeapi.co/api/v2/pokemon/ditto";




export const usePokemonData = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState([]);
  const [pokemonAbilityData, setPokemonAbilityData] = useState([]);
  const [pokemonTypeData, setPokemonTypeData] = useState([]);
  const [pokemonNatureData, setPokemonNatureData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonListDetails, setPokemonListDetails] = useState<any[]>([]);
  const [originalPokemonListDetail, setOriginalPokemonListDetail] = useState<any[]>([]);
  const [activePokemon, setActivePokemon] = useState<any>(null);

  const [filters, setFilters] = useState({
    type: "",
    ability: "",
    weight: "",
    height: "",
    sortOrder: "",
  });
 

  const fetchPokemon = async (page = 1) => {
    setLoading(true);
    try {
      const offset = (page - 1) * 50;
      const res = await axios.get(`${pokemonBaseUrl}/pokemon?limit=50&offset=${offset}`);
    
  
      const data = await res.data;
      setLoading(false);
    
      console.log("Pokemon data:", data);
      setPokemonList((prevList) => [...prevList, ...data.results]);
      setCurrentPage(page);
      return data.results;
    }
  
  
  
    catch (error) {
      setLoading(false);
      console.error("Error fetching Pokemon data:", error);
      return null;
    }
  };
  // Fetching species data
  const fetchSpeciesData = async () => {
    try {
      const res = await axios.get(pokemonSpeciesUrl);
      const data = await res.data;
      setPokemonSpeciesData(data);
      console.log("Species data:", data);
    } catch (error) {
      console.error("Error fetching species data:", error);
    }
  };
  // Fetching ability data
  const fetchAbilityData = async () => {
    try {
      const res = await axios.get(pokemonAbilityUrl);
      const data = await res.data;
      setPokemonAbilityData(data);
      console.log("Ability data:", data);
    } catch (error) {
      console.error("Error fetching ability data:", error);
    }
  };
  // Fetching type data
  const fetchTypeData = async () => {
    try {
      const res = await axios.get(pokemonTypeUrl);
      const data = await res.data;
      setPokemonTypeData(data);
      console.log("Type data:", data);
    } catch (error) {
      console.error("Error fetching type data:", error);
    }
  };
  // Fetching nature data
  const fetchNatureData = async () => {
    try {
      const res = await axios.get(pokemonNatureUrl);
      const data = await res.data;
      setPokemonNatureData(data);
      console.log("Nature data:", data);
    } catch (error) {
      console.error("Error fetching nature data:", error);
    }
  };
  // Fetching all data
  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchSpeciesData(),
      fetchAbilityData(),
      fetchTypeData(),
      fetchNatureData(),
    ]);
    setLoading(false);
  };
  //fetching pokemon details
  const fetchPokemonDetails = async ()=> {
    setLoading(true);
    try {
      const detail = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const data = await axios.get(pokemon.url);
          console.log("Pokemon details:", data);
          return data;
        })
      );
      setLoading(false);
      setPokemonListDetails(detail);
      // preserve the original list
      setOriginalPokemonListDetail(detail);
  
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
      return null;
    }
  };
  const fetchPokemonDetailsByName = async (name: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${pokemonBaseUrl}/pokemon/${name}`);
      const data = await res.data;
      setLoading(false);
      console.log("Pokemon details by name:", data);
      setActivePokemon(data);
      return data;
    } catch (error) {
      console.error("Error fetching Pokemon details by name:", error);
      setLoading(false);
      return null;
    }
  };
  const loadMore = async () => {
    fetchPokemon(currentPage + 1);
  };

  useEffect(() => {
    fetchPokemon();
    fetchAllData();
    loadMore();
    
  }, []);

  useEffect(() => {
    if (pokemonList.length > 0) {
      fetchPokemonDetails();
    }
  }, [pokemonList]);
  console.log("Pokemon List:", pokemonList);
  console.log("Pokemon all", pokemonListDetails);
  console.log("Pokemon species data:", pokemonSpeciesData);
  console.log("Pokemon ability data:", pokemonAbilityData);
  console.log("Pokemon type data:", pokemonTypeData);
  console.log("Pokemon nature data:", pokemonNatureData);
  console.log("Pokemon list details:", pokemonListDetails);
  
    return {
      pokemonList,
      pokemonSpeciesData,
      pokemonAbilityData,
      pokemonTypeData,
      pokemonNatureData,
      pokemonListDetails,
      originalPokemonListDetail,
      currentPage,
      setCurrentPage,
      setPokemonList,
      setPokemonSpeciesData,
      setPokemonAbilityData,
      setPokemonTypeData,
      setPokemonNatureData,
      setPokemonListDetails,
      setOriginalPokemonListDetail,
      loading,
      fetchPokemon,
      fetchPokemonDetailsByName,
      activePokemon,
      setActivePokemon,
      loadMore,
    };
  }
 