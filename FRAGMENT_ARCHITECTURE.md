Fragment Architecture

Overview
Fragment is an assistive writing environment designed to reduce idea-to-text friction while preserving academic integrity.

Fragment does not generate essays. It supports users in organizing ideas and improving writing flow while the user writes the text themselves.

System Workflow

Stage 1 — Idea Capture
The user writes fragmented thoughts about the essay topic.

Example input:
- main argument
- themes
- evidence ideas
- interpretation

These fragments are stored as structured notes.

Stage 2 — AI Organization
Fragment analyzes fragments and produces:

- suggested thesis
- outline structure
- grouped arguments

Output example:

Thesis
Paragraph groups
Key bullet reminders

The system only organizes ideas. It does not generate paragraphs.

Stage 3 — Draft Writing
The user writes their essay in their writing environment.

Fragment functions as a writing companion similar to Grammarly.

Fragment provides:
- transition suggestions
- reminders of earlier ideas
- prompts for expanding analysis
- structural guidance

Fragment does NOT:
- generate full essays
- write paragraphs for the user
- replace the student’s writing

Architecture Components

Frontend (Next.js)
- FragmentEditor
- OutlinePanel
- DraftAssistOverlay
- TopBar

Backend
- /api/organize
  organizes bullet fragments into structured outlines

Data Storage
Stores:
- fragment notes
- outline structure
- thesis suggestion

Does not store generated essays.

AI Layer
The AI system performs three tasks:

1. Idea clustering
2. Outline structuring
3. Writing guidance prompts

The AI never outputs full essay paragraphs.

Future Component

Draft Assist Mode

While the user types:

The system can suggest:

- transition phrases
- structural reminders
- prompts like:
  "Explain how this evidence supports your thesis."

This appears as a small suggestion box near the cursor.

Academic Integrity Design

Fragment enforces:

- student authorship
- idea ownership
- assistive guidance only

The AI operates as a writing coach, not a ghostwriter.

Design Philosophy

Fragment separates writing into two phases:

Thinking → Structuring

This reduces cognitive load while preserving the student's voice.
