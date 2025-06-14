"use client"
import React, { use, useActionState, useEffect } from "react"; // `useActionState` is not used here, can be removed if not needed elsewhere
import { Icons } from "@/utils/icons";
import { useRouter } from "next/navigation";
import { colorMap } from "@/utils/color";
import { useGlobalContest } from "@/app/contest/globalContest";
import { useUser } from "@auth0/nextjs-auth0"; // `Button` is not used here, can be removed if not needed elsewhere



interface PokemonCardProps {
  pokemon: any;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const { user } = useUser();
  const { performAction,userDetails } = useGlobalContest();
  const router = useRouter();

console.log("userDetails:", userDetails);

  const isLiked = userDetails?.liked?.includes(pokemon?.name);
  const isBookmarked = userDetails?.bookmarks?.includes(pokemon?.name);

  const [liked, setliked] = React.useState(isLiked);
  const [bookmarks, setisBookmarked] = React.useState(isBookmarked)


  
  

  const key = pokemon.type?.type?.name;
  const bgColor = colorMap[key] || "bg-gray-200";
  useEffect(() => {
    setliked(isLiked);
    setisBookmarked(isBookmarked);
  }, [isLiked, isBookmarked]);

  if (!userDetails) {
    
    return (
      <div className="flex items-center justify-center h-full">
        Loading user preferences...
      </div>
    );
  }
  

  return (
    <div>
      {/* You might want to add back the `relateve p-4 bg-white rounded-xl shadow-sm flex flex-col gap-2` classes here */}
      <div className="relateve p-4 bg-white rounded-xl shadow-sm flex flex-col gap-2">
        {/* This div seems to be wrapping the outer div, might be redundant if the outer div is the main container */}
        <div className=" flex justify-between items-center">
          <div className="flex gap-4 bg-white rounded-tl-xl rounded-tr-xl">
            {/* LIKE BUTTON */}
            <button
              className={`p-2 w-10 text-xl flex items-center justify-center rounded-full ${liked ? "text-[#fd4878] border-[#fd4878]" : ""}`}
              name="like" // Ensure `name="like"`
              onClick={() => {
                if (user?.sub) {
                  if (performAction) {
                    performAction(user?.sub, pokemon?.name, "like");
                    setliked((prev: boolean) => !prev);
                    console.log("performAction:", performAction);
                  } else {
                    alert('what happen!')
                    router.push("/api/autho/login")
                  }
                  
                }
              }}
            >
              
              {liked ? Icons.heartFilled : Icons.heartEmpty}
            </button>
            {/* BOOKMARK BUTTON */}
            <button
              className={`p-2 w-10 text-xl flex items-center justify-center rounded-full ${bookmarks ? 'text-green-300 border-green-300' : ''}`}
              name="bookmark" // Add `name="bookmark"`
              onClick={() => {
                if (user?.sub) {
                  if (performAction) {
                    performAction(user?.sub, pokemon?.name, "bookmark");
                    setisBookmarked((prev: boolean) => !prev);
                    console.log("performActio:", performAction);
                  }
                  else {
                    alert("what happen!")
                    router.push("/api/autho/login");
                  }
                }
              }} // Use the shared handler
            >
              {bookmarks?Icons.bookmarkFilled:Icons.bookmarkEmpty}
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
            {pokemon.types.map(
              (type: { type: { name: string } }, i: number) => {
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
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
