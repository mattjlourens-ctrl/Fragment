"use client";

export interface OutlineSection {
  title: string;
  bullets: string[];
}

export interface OutlineData {
  thesis: string;
  sections: OutlineSection[];
}

interface OutlinePanelProps {
  outline: OutlineData | null;
}

const PLACEHOLDER_SECTIONS: OutlineSection[] = [
  { title: "Paragraph 1", bullets: ["related ideas will appear here"] },
  { title: "Paragraph 2", bullets: ["related ideas will appear here"] },
  { title: "Paragraph 3", bullets: ["related ideas will appear here"] },
];

export default function OutlinePanel({ outline }: OutlinePanelProps) {
  const thesis = outline?.thesis ?? null;
  const sections = outline?.sections ?? PLACEHOLDER_SECTIONS;
  const isEmpty = outline === null;

  return (
    <aside className="flex flex-col h-full bg-[#171A21] border-l border-[#242833]">

      {/* Header */}
      <div className="px-6 py-4 border-b border-[#242833]">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF]/50">
          Outline
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">

        {/* Thesis */}
        <section className="space-y-2">
          <h3 className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF]/50">
            Thesis
          </h3>
          <div className="h-px bg-[#242833]" />
          <p className={`text-[13px] leading-relaxed ${isEmpty ? "text-[#9CA3AF]/30 italic" : "text-[#E6E6E6]"}`}>
            {thesis ?? "Your thesis will appear here after organizing ideas."}
          </p>
        </section>

        {/* Sections */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF]/50 shrink-0">
              Outline
            </h3>
            <div className="flex-1 h-px bg-[#242833]" />
          </div>

          <div className="space-y-5">
            {sections.map((section, i) => (
              <div key={i} className="space-y-2">
                <p className={`text-[13px] font-medium ${isEmpty ? "text-[#9CA3AF]/40" : "text-[#E6E6E6]"}`}>
                  {section.title}
                </p>
                <ul className="space-y-1">
                  {section.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-[#4F7CAC]/40 shrink-0 text-xs mt-[3px]">•</span>
                      <span className={`text-[13px] leading-5 ${isEmpty ? "text-[#9CA3AF]/30 italic" : "text-[#9CA3AF]"}`}>
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </div>

    </aside>
  );
}
