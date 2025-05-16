import Image from "next/image";
import { Chewy } from "next/font/google";



export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>
        The Only Online World Where Every Pokémon Fan Can Trade, Buy & Play
      </h1>
      <div className="flex flex-col items-center justify-center gap-8">
        <h3> More than just collecting – this is where your Pokémon journey expands! Find rare cards, make epic trades, and prove your skills in exciting games, all in one place.</h3>
        
      </div>
    </div>
  );
}
