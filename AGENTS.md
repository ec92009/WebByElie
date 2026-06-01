Before making changes, also read parent instruction files at `~/AGENTS.md` and `~/Dev/AGENTS.md` if they exist, then apply this repo file last.

# AGENTS.md

Repo-level working preferences for `/Users/ecohen/Dev/WebByElie`.

## Project

- Static public-facing service site for Web By Elie.
- Intended domain: `web-by-elie.com`.
- Keep the first version simple, clear, and referral-friendly.

## Workflow

- Prefer small, direct edits.
- Keep secrets, private client context, and unpublished strategy out of source files.
- Include public policy pages for Privacy, Terms, and Data Deletion.
- Commit and push public-facing changes once complete unless the user asks not to.

## Versioning

- Follow `~/Dev/.SOPs/VERSIONING_SOP.md`.
- `VERSION` is the source of truth for the visible site version, without the leading `v`.
- Use the shared calendar visible version format from the SOP.
- When public HTML or CSS changes, keep the visible footer version and `assets/styles.css?v=X.Y` cache-bust strings in sync.

## Timelog

- Track active collaboration time in `TIMELOG.md`.
- Follow `~/Dev/.SOPs/TIMELOG_SOP.md`.
- Count only active user collaboration time, not Codex background work or deployment waits.

## Preview

- Local preview can run with `python3 -m http.server 8094`.
- Main local URL: `http://localhost:8094/`.
