"use client";
import React, { useEffect,useState } from 'react';
import { useGlobalContest } from '../contest/globalContest';
import PokemonCard from '@/components/pokemonCard';

export default function TradePage() {
  const { fetchPokemonDetailsByName, userDetails } = useGlobalContest();
  const [likedPokemon, setLikedPokemon] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    if (userDetails?.liked ) {
      setLoading(true);
      const fetchLikedPokemon = async () => {
        const pokemonDetails = await Promise.all(
        userDetails.liked.map(async (pokemonName: string) => {
          const detail = await fetchPokemonDetailsByName(pokemonName);
          return detail;
        })
      );
      // You may want to set the fetched details to state here
      // setLikedPokemon(pokemonDetails);
      setLikedPokemon(pokemonDetails as any[]);
    
      };
      setLoading(false);
    fetchLikedPokemon();
    }
  }, [userDetails?.liked]);
  
  
  return (
    <main>
      <section className="min-h-[91vh]">
        {likedPokemon.length > 0 ? (
          <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {likedPokemon.map((pokemon: any, index: number) => (
              <PokemonCard key={pokemon.name + index} pokemon={pokemon} />
            ))}
          </div>
        ) : (
         
            <h1 className="text-center text-4xl font-bold text-gray-800 mt-20">
              No liked Pokémon found.
            </h1>
          
        )}
      </section>
    </main>
  );
}

// Drop this file in /pages/hello.js to route to /hello