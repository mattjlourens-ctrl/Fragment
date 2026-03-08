"use client";

interface Bullet {
  id: string;
  text: string;
  depth: number;
}

interface OutlinePanelProps {
  bullets: Bullet[];
}

export default function OutlinePanel({ bullets }: OutlinePanelProps) {
  const filled = bullets.filter((b) => b.text.trim().length > 0);

  return (
    <aside className="flex flex-col h-full border-l border-white/5 bg-[#171A21]">
      <div className="px-5 py-4 border-b border-white/5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF]/50">
          Outline
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {filled.length === 0 ? (
          <p className="text-[13px] text-[#9CA3AF]/30 mt-1 leading-relaxed">
            Your structure will appear here as you write.
          </p>
        ) : (
          <ul className="space-y-1">
            {filled.map((bullet) => (
              <li
                key={bullet.id}
                className="flex items-start gap-2 text-[13px] leading-5"
                style={{ paddingLeft: `${bullet.depth * 12}px` }}
              >
                <span className="mt-[1px] text-[#4F7CAC]/50 shrink-0">·</span>
                <span className="text-[#9CA3AF] truncate">{bullet.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="px-5 py-3 border-t border-white/5">
        <p className="text-[11px] text-[#9CA3AF]/30">
          {filled.length} {filled.length === 1 ? "fragment" : "fragments"}
        </p>
      </div>
    </aside>
  );
}
