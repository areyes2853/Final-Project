"use client";
import { useGlobalContest } from "@/app/contest/globalContest";
import React, { useState, useEffect } from "react";
import { colorMapOriginal } from "@/utils/color";
import { Icons } from "@/utils/icons";

// TODO: Replace 'volumeHigh' with the correct import or define a placeholder icon if missing

interface Props {
  params: Promise<{ id: string }>;
}

const page = ({ params }: Props) => {
  const { fetchPokemonDetailsByName, loading, activePokemon } =
    useGlobalContest();
  const { id } = React.use(params);

  // State to hold the typeName, initialized to null
  const [displayedTypeName, setDisplayedTypeName] = useState<string | null>(
    null
  );

  React.useEffect(() => {
    fetchPokemonDetailsByName(id);
  }, [id]);

  useEffect(() => {
    if (activePokemon?.types && activePokemon.types.length > 0) {
      const typeName = Math.floor(Math.random() * activePokemon.types.length);
      setDisplayedTypeName(activePokemon.types[typeName].type.name);
    } else {
      setDisplayedTypeName(null);
    }
  }, [activePokemon]);

  // const typeName: string =
  //   activePokemon?.types && activePokemon.types.length > 0
  //     ? activePokemon.types[
  //         Math.floor(Math.random() * activePokemon?.types.length)
  //       ].type.name
  //     : null;

  const sectionDynamicBackground = displayedTypeName
    ? `radial-gradient(125% 125% at 50% 10%, hsla(0,0%,100%,0) 0, ${
        colorMapOriginal[displayedTypeName + "light"]
      } 60%, ${colorMapOriginal[displayedTypeName]} 100%)`
    : "transparent"; // Fallback to transparent if no typeName

  function handleClick() {
    const audio = new Audio(
      activePokemon?.cries.legacy || "https://pokeapi.co/media/sounds/001.ogg"
    );
    audio.play();
  }

  return (
    <section
      style={{
        background: sectionDynamicBackground,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="p-4" // Overall padding around the main card
    >
      {/* Main White Card (PokedexCard from design) */}
      <div
        className={`
       rounded-3xl shadow-xl p-6 lg:p-10
        max-w-7xl w-full
        grid grid-cols-1 md:grid-cols-2 // Changed pap-8 to gap-8
      `}
      >
        {/* Left Column Content */}
        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-4xl font-bold mb-4 capitalize">
            {activePokemon?.name}
          </h2>
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-bold">Abilities.</p>
            <ul className="flex gap-2 flex-wrap">
              {" "}
              {/* Added flex-wrap for abilities */}
              {activePokemon?.abilities.map((ability: any, index: number) => (
                <li
                  key={index}
                  className="px-4 py-2 bg-gray-100 rounded-lg shadow-md capitalize" // Added capitalize
                >
                  {ability.ability.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Types</h2>
            <ul className="flex gap-2">
              {activePokemon?.types.map((type: any, index: number) => (
                <li
                  key={index}
                  className="px-4 py-2 bg-gray-100 rounded-lg shadow-md capitalize" // Added capitalize
                >
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Stats</h2>
            <ul className="flex flex-wrap gap-2">
              {" "}
              {/* Added flex-wrap for stats */}
              {activePokemon?.stats.map((stat: any, index: number) => (
                <li
                  key={index}
                  className="flex flex-col gap-1 px-4 py-2 bg-gray-100 rounded-lg shadow-md capitalize" // Added capitalize
                >
                  {" "}
                  <div className="flex items-center gap-4">
                    <span className="capitalize text-black text-sm ml-2">
                      {stat.stat.name}
                    </span>
                    <span className="capitilze text-black text-sm ml-2">
                      {stat.base_stat}
                    </span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden mt-1">
                    <div
                      className="bg-blue-500 h-full"
                      style={{
                        width: `${(stat.base_stat / 100) * 100}%`,
                      }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-2 flex gap-4">
            <p className="p-4 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg">
              <span className="text-sm flex items-center gap-2">
                {Icons.Ruler} Height
              </span>
              {activePokemon?.height}m
            </p>
            <p className="p-4 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg">
              <span className="text-sm flex items-center gap-2">
                {Icons.Weight} Weight
              </span>
              {activePokemon?.weight}kg
            </p>
            <p className="p-4 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg">
              <span className="text-sm flex items-center gap-2">
                {Icons.Dumbbell} Base Experience
              </span>
              {activePokemon?.base_experience}xp
            </p>
          </div>
        </div>

        {/* Right Column Content - RESTRUCTURED */}
        <div className="relative flex flex-col items-center justify-start">
          {" "}
          {/* Align items to start, not center */}
          {/* Type SVG as a background element */}
          {displayedTypeName ? (
            <img
              src={`/pokemon-type-svg-icons-master/icons/${displayedTypeName}.svg`}
              width={700}
              height={700}
              alt="pokemon type background"
              className="absolute opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl pointer-events-none"
            />
          ) : (
            <div className="w-[700px] h-[700px] flex items-center justify-center bg-gray-100">
              Loading type icon...
            </div>
          )}
          {/* Main Pokemon image */}
          <img
            alt="pokemon image"
            src={
              activePokemon?.sprites.other["official-artwork"].front_default ||
              activePokemon?.sprites?.other?.front_shiny
            }
            width={400}
            height={400}
            className="relative z-10 drop-shadow-2xl mb-8" // Added margin-bottom to push details down
          />
          {/* Container for Button and Pokemon Details - Positioned below the image */}
          <div className="z-20 w-full flex flex-col items-end px-4">
            {" "}
            {/* Align content to the end (right) */}
            <div className="flex gap-4 mb-4">
              {" "}
              {/* Margin bottom for spacing */}
              <button
                className="px-4 py-2 flex items-center gap-2 text-sm font-bold bg-white rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 ease-in-out"
                onClick={handleClick}
              >
                {Icons.volumHigh} Old Cry
              </button>
            </div>
            {/* Pokemon Details section */}
            <div className="flex flex-col gap-1 text-right">
              {" "}
              {/* Align text to right */}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Pokemon Details
              </h3>
            </div>
            {/* Empty div removed as it's not needed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
