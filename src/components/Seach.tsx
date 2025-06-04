
"use client"
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react'

function Seach() {
  return (
    <form className="hidden sm:block">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className="block w-[200px] bg-gray-700 text-gray-200 placeholder-gray-400 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md pl-10 pr-3 py-2 text-sm"
          placeholder="Search"
        />
      </div>
    </form>
  );
}

export default Seach