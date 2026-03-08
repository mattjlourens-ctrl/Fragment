"use client";

import { useState } from "react";
import FragmentEditor, { type Fragment } from "@/components/FragmentEditor";
import OutlinePanel, { type OutlineData } from "@/components/OutlinePanel";

export function parseFragments(fragments: Fragment[]): string[] {
  return fragments.map((f) => f.text.trim()).filter((t) => t.length > 0);
}

const INITIAL_FRAGMENTS: Fragment[] = [{ id: "init", text: "" }];

export default function Home() {
  const [fragments, setFragments] = useState<Fragment[]>(INITIAL_FRAGMENTS);
  const [outline] = useState<OutlineData | null>(null);

  const parsed = parseFragments(fragments);
  const canOrganize = parsed.length > 0;

  const handleOrganize = () => {
    // AI integration will go here
    console.log("Parsed fragments:", parsed);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0F1115] overflow-hidden">

      {/* Top bar */}
      <header className="flex items-center justify-between px-6 h-12 shrink-0 border-b border-[#242833]">
        <span className="text-[#E6E6E6] text-sm font-semibold tracking-tight">
          Fragment
        </span>
        <button
          onClick={handleOrganize}
          disabled={!canOrganize}
          className="
            px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-150
            bg-[#4F7CAC]/10 text-[#4F7CAC] border border-[#4F7CAC]/20
            hover:bg-[#4F7CAC]/20 hover:border-[#4F7CAC]/40
            disabled:opacity-25 disabled:cursor-not-allowed
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4F7CAC]/50
          "
        >
          Organize Ideas
        </button>
      </header>

      {/* Main workspace */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left — Fragment editor (70%) */}
        <main className="flex-[7] overflow-hidden">
          <FragmentEditor fragments={fragments} onChange={setFragments} />
        </main>

        {/* Right — Outline panel (30%) */}
        <aside className="flex-[3] overflow-hidden">
          <OutlinePanel outline={outline} />
        </aside>

      </div>
    </div>
  );
}
