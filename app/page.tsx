"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  return (
    <main className="min-h-screen bg-[#0F1115] text-white flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-4">
        <h1 className="text-3xl font-semibold">Fragment</h1>

        <textarea
          className="w-full h-64 p-4 bg-zinc-900 border border-zinc-700 rounded-md outline-none"
          placeholder="• dump your idea fragments here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500">
          Organize My Thoughts
        </button>
      </div>
    </main>
  );
}