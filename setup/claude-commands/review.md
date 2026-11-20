---
description: Review a finished task or files against the spec and the Definition of done
argument-hint: "<task ID or file paths>"
---
Review $ARGUMENTS against DESCRIPTION.md and the "Definition of done" in AGENTS.md. Read only the relevant files or diff.

Report: ✅ what is fine, then at most 5 ⚠ issues, each with the fix and the owner (lane). Don't rewrite the work yourself unless the fix is one line. If you caught a real AI mistake, add one line to "AI log" in status/claude.md.
