"use client";

import { useRef, useCallback } from "react";

export interface Fragment {
  id: string;
  text: string;
}

interface FragmentEditorProps {
  fragments: Fragment[];
  onChange: (fragments: Fragment[]) => void;
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export default function FragmentEditor({ fragments, onChange }: FragmentEditorProps) {
  const refs = useRef<Map<string, HTMLDivElement>>(new Map());

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
        const newFrag: Fragment = { id: generateId(), text: "" };
        const next = [...fragments];
        next.splice(index + 1, 0, newFrag);
        onChange(next);
        focusLine(newFrag.id, false);
      }

      if (e.key === "Backspace" && frag.text === "" && fragments.length > 1) {
        e.preventDefault();
        const next = fragments.filter((_, i) => i !== index);
        onChange(next);
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
    [fragments, onChange, focusLine]
  );

  const handleInput = useCallback(
    (e: React.SyntheticEvent<HTMLDivElement>, index: number) => {
      const next = [...fragments];
      next[index] = {
        ...fragments[index],
        text: (e.target as HTMLDivElement).innerText,
      };
      onChange(next);
    },
    [fragments, onChange]
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto px-10 py-10">
      <div className="w-full max-w-lg mx-auto flex flex-col gap-8">

        {/* Label */}
        <div className="space-y-1">
          <p className="text-[#9CA3AF] text-sm leading-relaxed">
            Enter your ideas — one fragment per line.
          </p>
        </div>

        {/* Bullets */}
        <div className="space-y-1.5">
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
                data-placeholder={index === 0 ? "e.g. burning field imagery..." : ""}
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

        {/* Fragment count */}
        <p className="text-[11px] text-[#9CA3AF]/40 tabular-nums">
          {fragments.filter((f) => f.text.trim()).length === 0
            ? "No ideas yet"
            : `${fragments.filter((f) => f.text.trim()).length} ${
                fragments.filter((f) => f.text.trim()).length === 1 ? "idea" : "ideas"
              } captured`}
        </p>

      </div>
    </div>
  );
}
