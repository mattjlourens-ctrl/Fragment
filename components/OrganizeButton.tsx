"use client";

interface OrganizeButtonProps {
  onClick?: () => void;
}

export default function OrganizeButton({ onClick }: OrganizeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1.5 text-sm font-medium rounded-md transition-colors duration-150
        bg-[#4F7CAC]/10 text-[#4F7CAC] border border-[#4F7CAC]/20
        hover:bg-[#4F7CAC]/20 hover:border-[#4F7CAC]/40
        focus:outline-none focus:ring-1 focus:ring-[#4F7CAC]/40"
    >
      Organize
    </button>
  );
}
