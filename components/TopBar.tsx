"use client";

import OrganizeButton from "./OrganizeButton";

interface TopBarProps {
  onOrganize?: () => void;
}

export default function TopBar({ onOrganize }: TopBarProps) {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-[#0F1115]">
      <span className="text-[#E6E6E6] text-sm font-semibold tracking-wide">
        Fragment
      </span>
      <OrganizeButton onClick={onOrganize} />
    </header>
  );
}
