import React, { JSX } from 'react';

export default async function MarketplacePage(): Promise<JSX.Element> {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  const json = await data.json();
  return (
    <div>
      <h1>Hello MarketPlace</h1>
    </div>
  );
}

// Drop this file in /pages/hello.js to route to /hello