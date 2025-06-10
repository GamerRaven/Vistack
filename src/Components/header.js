import React from 'react';

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-white border-b border-gray-200 shadow-sm flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-bold text-violet-600">Vistack</h1>
      {/* <div className="flex items-center gap-4">
        <button className="text-sm text-gray-600 hover:text-violet-600">Login</button>
        <button className="bg-violet-600 text-white px-4 py-1 rounded text-sm">Sign Up</button>
      </div> */}
    </header>
  );
}