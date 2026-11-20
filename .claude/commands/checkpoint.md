---
description: Checkpoint. Read status files, spot-review, re-plan TASKS.md
argument-hint: "[optional: what we noticed]"
---
Run the Checkpoint procedure in CLAUDE.md. Keep it lean: your usage is the team's bottleneck.

1. Run `date` and `git pull --rebase`.
2. In each status/*.md read only "Now", the new "Done" entries and "Blockers".
3. Spot-check at most 2 risky diffs (`git diff --stat` first). If the app is deployed, check `<live URL>/api/health`.
4. Update TASKS.md: statuses, unblock blockers first, new tasks, cuts. Compare with the APPROACH.md timeline; cut scope, never the freeze times.
5. Add 3 lines under "Checkpoint log" in status/claude.md, then commit and push (same steps as /sync).
6. Report in at most 8 lines: on track or not, what changed, what each human sends to which agent next. Mention your `/usage` level if it's above 50%.

What we noticed: $ARGUMENTS
