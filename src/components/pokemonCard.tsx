import React from "react";
import { Icons } from "@/utils/icons";
import { useRouter } from "next/navigation";
import { Wind } from "lucide-react";

interface PokemonCardProps {
  pokemon: any;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const router = useRouter();
  const colorMap: Record<string, string> = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-400",
    ice: "bg-blue-200",
    flying: "bg-gray-500",
    bug: "bg-green-300",
    poison: "bg-purple-900",
    ground: "bg-orange-950",
    normal: "bg-black",
    fairy: "bg-fuchsia-300"
  };
  const key = pokemon.type?.type?.name;
 const bgColor = colorMap[key] || "bg-gray-200";
  return (
    <div className="relateve p-4 bg-white rounded-xl shadow-sm flex flex-col gap-2">
      <div className=" flex justify-between items-center">
        <div className="flex gap-4 bg-white rounded-tl-xl rounded-tr-xl">
          <button
            className={`p-2 w-10 text-xl flex items-center justify-center rounded-full`}
          >
            {Icons.heartEmpty}
          </button>
          <button
            className={`p-2 w-10 text-xl flex items-center justify-center rounded-full`}
          >
            {Icons.bookmarkEmpty}
          </button>
        </div>
        <button
          className="p-2 w-10 text-xl flex items-center justify-center rounded-full border-2 text-gray-500 border-gray-300 hover:bg-green-300 hover:border-transparent hover:text-black transition duration-300 ease-in-out"
          onClick={() => router.push(`/pokemon/${pokemon?.name}`)}
        >
          {Icons.arrowAngleRight}
        </button>
      </div>
      <div className=" flex gap-4"></div>
      <div className="flex-1">
        <img
          src={
            pokemon?.sprites?.other?.home?.front_default ||
            pokemon?.sprites?.back_default
          }
          alt={pokemon?.name}
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold capitalize">{pokemon?.name}</h2>
          <p className="text-gray-500">Xp: {pokemon?.base_experience}</p>
          <p className="text-gray-500">height: {pokemon?.height}cm</p>
          <p className="text-gray-500">weight: {pokemon?.weight}kg</p>
        </div>
        <div className="flex gap-2">
          {pokemon.types.map((type: { type: { name: string } }, i: number) => {
            const key = type.type.name.toLowerCase();
            const bgClass = colorMap[key] ?? "bg-gray-200";
            return (
              <p
                key={i}
                className={`${bgClass} text-white px-2 py-1 rounded-full`}
              >
                {type.type.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
