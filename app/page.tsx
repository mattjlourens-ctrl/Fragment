"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import FragmentEditor from "@/components/FragmentEditor";
import OutlinePanel from "@/components/OutlinePanel";

interface Bullet {
  id: string;
  text: string;
  depth: number;
}

const initialBullets: Bullet[] = [
  { id: "init-1", text: "", depth: 0 },
];

export default function Home() {
  const [bullets, setBullets] = useState<Bullet[]>(initialBullets);

  return (
    <div className="flex flex-col h-screen bg-[#0F1115] overflow-hidden">
      <TopBar onOrganize={() => {}} />

      <div className="flex flex-1 overflow-hidden">
        {/* Editor — 70% */}
        <main className="flex-[7] overflow-hidden">
          <FragmentEditor bullets={bullets} onChange={setBullets} />
        </main>

        {/* Outline — 30% */}
        <div className="flex-[3] overflow-hidden">
          <OutlinePanel bullets={bullets} />
        </div>
      </div>
    </div>
  );
}
