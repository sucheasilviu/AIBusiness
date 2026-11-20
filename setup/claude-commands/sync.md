---
description: Safely commit and push laptop A (build check first)
---
1. `git status --short`. If anything under web/ changed, run `npm run build` in web/. If the build fails, report the error and the likely owner, and don't push the web changes that break it.
2. Commit everything with a message naming the finished task IDs from the status files, e.g. `T05 T06: landing copy + AI route`.
3. `git pull --rebase`. Resolve trivial conflicts in status/ or TASKS.md by keeping both sides; for anything else, stop and ask me.
4. `git push`. Report in 2 lines.
