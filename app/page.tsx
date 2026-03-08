"use client";

import { useState, useRef, useCallback } from "react";

interface Fragment {
  id: string;
  text: string;
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function parseFragments(fragments: Fragment[]): string[] {
  return fragments.map((f) => f.text.trim()).filter((t) => t.length > 0);
}

const INITIAL_FRAGMENTS: Fragment[] = [{ id: "init", text: "" }];

export default function Home() {
  const [fragments, setFragments] = useState<Fragment[]>(INITIAL_FRAGMENTS);
  const refs = useRef<Map<string, HTMLDivElement>>(new Map());

  const parsed = parseFragments(fragments);

  const focusLine = useCallback((id: string, atEnd = true) => {
    requestAnimationFrame(() => {
      const el = refs.current.get(id);
      if (!el) return;
      el.focus();
      const sel = window.getSelection();
      const range = document.createRange();
      const node = el.firstChild ?? el;
      const offset = atEnd ? ((node as Text).length ?? 0) : 0;
      try {
        range.setStart(node, offset);
        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
      } catch {
        // empty node — ignore
      }
    });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
      const frag = fragments[index];

      if (e.key === "Enter") {
        e.preventDefault();
        const next = [...fragments];
        const newFrag: Fragment = { id: generateId(), text: "" };
        next.splice(index + 1, 0, newFrag);
        setFragments(next);
        focusLine(newFrag.id, false);
      }

      if (e.key === "Backspace" && frag.text === "" && fragments.length > 1) {
        e.preventDefault();
        const next = fragments.filter((_, i) => i !== index);
        setFragments(next);
        const targetId = fragments[index - 1]?.id ?? fragments[index + 1]?.id;
        if (targetId) focusLine(targetId);
      }

      if (e.key === "ArrowUp" && index > 0) {
        e.preventDefault();
        focusLine(fragments[index - 1].id);
      }

      if (e.key === "ArrowDown" && index < fragments.length - 1) {
        e.preventDefault();
        focusLine(fragments[index + 1].id);
      }
    },
    [fragments, focusLine]
  );

  const handleInput = useCallback(
    (e: React.SyntheticEvent<HTMLDivElement>, index: number) => {
      const next = [...fragments];
      next[index] = {
        ...fragments[index],
        text: (e.target as HTMLDivElement).innerText,
      };
      setFragments(next);
    },
    [fragments]
  );

  const handleOrganize = () => {
    // AI integration will go here
    console.log("Parsed fragments:", parsed);
  };

  return (
    <main className="min-h-screen bg-[#0F1115] flex flex-col items-center px-6 py-20">
      <div className="w-full max-w-xl flex flex-col gap-10">

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-[#E6E6E6] text-xl font-semibold tracking-tight">
            Fragment
          </h1>
          <p className="text-[#9CA3AF] text-sm leading-relaxed">
            Enter your ideas — one fragment per line.
          </p>
        </div>

        {/* Bullet editor */}
        <div className="bg-[#171A21] rounded-xl border border-white/[0.06] shadow-sm px-6 py-5 space-y-1.5">
          {fragments.map((frag, index) => (
            <div key={frag.id} className="flex items-start gap-3">
              <span className="text-[#4F7CAC]/50 select-none text-sm leading-6 mt-px shrink-0">
                •
              </span>
              <div
                ref={(el) => {
                  if (el) refs.current.set(frag.id, el);
                  else refs.current.delete(frag.id);
                }}
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                data-gramm="false"
                data-placeholder={
                  index === 0 ? "e.g. burning field imagery..." : ""
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
                onInput={(e) => handleInput(e, index)}
                className="
                  flex-1 min-h-[24px] text-[15px] leading-6 text-[#E6E6E6]
                  outline-none caret-[#4F7CAC] break-words
                  empty:before:content-[attr(data-placeholder)]
                  empty:before:text-[#9CA3AF]/30
                "
              />
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#9CA3AF]/40 tabular-nums">
            {parsed.length === 0
              ? "No ideas yet"
              : `${parsed.length} ${parsed.length === 1 ? "idea" : "ideas"} captured`}
          </span>

          <button
            onClick={handleOrganize}
            disabled={parsed.length === 0}
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
        </div>

      </div>
    </main>
  );
}
