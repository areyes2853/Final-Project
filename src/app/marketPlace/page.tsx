"use client";
import Head from 'next/head';
import { useGlobalContest } from '@/contest/globalContest';
import { useUser } from '@auth0/nextjs-auth0';
import PokemonCard from '@/components/pokemonCard';


export default function Marketplace() {
  const { isLoading, user } = useUser();
  const { pokemonListDetails, loading } = useGlobalContest();
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <main>
      <Head>
          <title>Marketplace</title>
          {isLoading && <p>Loading...</p>}
        {user && <p>Welcome, {user.name}!</p>}
        {!user && <p>Please log in to see your profile.</p>}
        </Head>
        <section className='min-h-screen'>
          <div className='px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' >
            {!loading && pokemonListDetails.map((pokemon: any, index: number) => (
              <PokemonCard key={index} pokemon={pokemon.data} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

// Drop this file in /pages/hello.js to route to /hello