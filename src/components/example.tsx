// // App.js or main layout file
// function App() {
//   return (
//     <div className="min-h-screen bg-orange-200 flex items-center justify-center p-4">
//       {" "}
//       {/* Background with a warm orange tint */}
//       <PokedexCard />
//     </div>
//   );
// }

// // PokedexCard.jsx
// function PokedexCard() {
//   return (
//     <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-10 max-w-7xl w-full">
//       {" "}
//       {/* Large rounded card */}
//       <PokedexHeader />
//       <PokedexMainContent />
//     </div>
//   );
// }

// // PokedexHeader.jsx
// function PokedexHeader() {
//   return (
//     <div className="flex items-center justify-between mb-6">
//       {/* Back arrow and Pokedex title */}
//       {/* Charmanader #004 and Type badges */}
//     </div>
//   );
// }

// // PokedexMainContent.jsx
// function PokedexMainContent() {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {" "}
//       {/* Main content grid */}
//       <PokemonImageSection /> {/* col-span-1 or 2 */}
//       <PokemonDetailsSection /> {/* col-span-1 or 2 */}
//     </div>
//   );
// }

// // PokemonImageSection.jsx
// function PokemonImageSection() {
//   return (
//     <div className="relative col-span-1 lg:col-span-2 flex justify-center items-center">
//       {/* Previous/Next buttons for Pokemon */}
//       {/* Charmander image */}
//     </div>
//   );
// }

// // PokemonDetailsSection.jsx
// function PokemonDetailsSection() {
//   return (
//     <div className="col-span-1 lg:col-span-1 grid grid-cols-1 gap-6">
//       {" "}
//       {/* Details section layout */}
//       <PokemonTabs />
//       <PokemonWeaknesses />
//       <PokemonStory />
//       <PokemonVersions />
//       <PokemonStatsAndAbilities />
//       <PokemonEvolutions />
//     </div>
//   );
// }

// // ... and then smaller components for each section like PokemonTabs, TypeBadge, StatsBar, EvolutionCard, etc.
