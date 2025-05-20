"use client";
import Head from "next/head";
import { useGlobalContest } from "@/app/contest/globalContest";
import { useUser } from "@auth0/nextjs-auth0";
import PokemonCard from "@/components/pokemonCard";
import { Icons } from "@/utils/icons";

export default function Marketplace() {
  const { isLoading, user } = useUser();
  const { pokemonListDetails, loading, loadMore } = useGlobalContest();
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <section className="min-h-screen">
      <Head>
        <title>Marketplace</title>
        {isLoading && <p>Loading...</p>}
        {user && <p>Welcome, {user.name}!</p>}
        {!user && <p>Please log in to see your profile.</p>}
      </Head>
      <section className="min-h-screen">
        <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!loading &&
            pokemonListDetails.map((pokemon: any, index: number) => (
              <PokemonCard key={index} pokemon={pokemon.data} />
            ))}
        </div>
      </section>
      {pokemonListDetails.length > 38 && (
        <div className="mt-4 mb-10 flex items-center justify-center">
          <button
            onClick={loadMore}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            <span className="text-lg">{Icons.arrowAngleDown}</span>Load More
          </button>
        </div>
      )}
    </section>
  );
}

// Drop this file in /pages/hello.js to route to /hello
