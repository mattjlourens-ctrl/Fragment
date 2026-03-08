"use client";

import { useRef, useCallback } from "react";

interface Bullet {
  id: string;
  text: string;
  depth: number;
}

interface FragmentEditorProps {
  bullets: Bullet[];
  onChange: (bullets: Bullet[]) => void;
}

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function FragmentEditor({ bullets, onChange }: FragmentEditorProps) {
  const refs = useRef<Map<string, HTMLDivElement>>(new Map());

  const focusLine = useCallback((id: string, atEnd = true) => {
    requestAnimationFrame(() => {
      const el = refs.current.get(id);
      if (!el) return;
      el.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      const target = el.childNodes[0] ?? el;
      const offset = atEnd ? (target as Text).length ?? 0 : 0;
      try {
        range.setStart(target, offset);
        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
      } catch {
        // node may be empty
      }
    });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
      const bullet = bullets[index];

      if (e.key === "Enter") {
        e.preventDefault();
        const newBullet: Bullet = { id: generateId(), text: "", depth: bullet.depth };
        const next = [...bullets];
        next.splice(index + 1, 0, newBullet);
        onChange(next);
        focusLine(newBullet.id, false);
      }

      if (e.key === "Tab") {
        e.preventDefault();
        const next = [...bullets];
        if (e.shiftKey) {
          next[index] = { ...bullet, depth: Math.max(0, bullet.depth - 1) };
        } else {
          next[index] = { ...bullet, depth: Math.min(4, bullet.depth + 1) };
        }
        onChange(next);
        focusLine(bullet.id);
      }

      if (e.key === "Backspace" && bullet.text === "" && bullets.length > 1) {
        e.preventDefault();
        const next = bullets.filter((_, i) => i !== index);
        onChange(next);
        const prevId = bullets[index - 1]?.id ?? bullets[index + 1]?.id;
        if (prevId) focusLine(prevId);
      }

      if (e.key === "ArrowUp" && index > 0) {
        e.preventDefault();
        focusLine(bullets[index - 1].id);
      }

      if (e.key === "ArrowDown" && index < bullets.length - 1) {
        e.preventDefault();
        focusLine(bullets[index + 1].id);
      }
    },
    [bullets, onChange, focusLine]
  );

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>, index: number) => {
      const next = [...bullets];
      next[index] = { ...bullets[index], text: (e.target as HTMLDivElement).innerText };
      onChange(next);
    },
    [bullets, onChange]
  );

  return (
    <div className="flex flex-col h-full px-10 py-8 overflow-y-auto">
      <div className="w-full max-w-2xl mx-auto space-y-0.5">
        {bullets.map((bullet, index) => (
          <div
            key={bullet.id}
            className="flex items-start gap-2.5 group"
            style={{ paddingLeft: `${bullet.depth * 24}px` }}
          >
            <span className="mt-[3px] text-[#4F7CAC]/60 text-sm select-none shrink-0 leading-6">
              •
            </span>
            <div
              ref={(el) => {
                if (el) refs.current.set(bullet.id, el);
                else refs.current.delete(bullet.id);
              }}
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              data-gramm="false"
              onKeyDown={(e) => handleKeyDown(e, index)}
              onInput={(e) => handleInput(e, index)}
              className="flex-1 text-[#E6E6E6] text-[15px] leading-6 outline-none
                empty:before:content-[attr(data-placeholder)] empty:before:text-[#9CA3AF]/40
                focus:empty:before:text-[#9CA3AF]/20 break-words min-h-[24px] cursor-text
                caret-[#4F7CAC]"
              data-placeholder={index === 0 ? "Start writing..." : ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
