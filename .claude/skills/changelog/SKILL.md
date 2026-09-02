---
name: changelog
description: Record a user-visible change in CHANGELOG.md, or cut a release by promoting [Unreleased] and bumping the version in package.json. Use whenever finishing a feature, fix or other user-visible change destined for main, before committing to main or opening a pull request, and whenever the user asks to release, cut a version, tag, or bump the version.
---

# Changelog and version maintenance

This repo keeps a [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
`CHANGELOG.md` and follows [SemVer](https://semver.org). Commit messages are
enforced as Conventional Commits by commitlint, which makes them the input for
both jobs below.

**Two distinct jobs. Work out which one you are doing first.**

| Situation                                   | Job                                                                  |
| ------------------------------------------- | -------------------------------------------------------------------- |
| A change is going to `main`                 | [Record a change](#job-1-record-a-change) — edit `[Unreleased]` only |
| User asks to release / cut a version / bump | [Cut a release](#job-2-cut-a-release) — promote and bump             |

The version in `package.json` **only moves at release**. A change landing on
`main` never bumps it — it accumulates under `[Unreleased]` until a release
promotes it. Do not bump the version just because you added a changelog entry.

## Job 1: Record a change

Do this as part of finishing the change, before committing to `main` or opening
a PR — not as a follow-up someone has to remember.

1. Read the `[Unreleased]` section at the top of `CHANGELOG.md`.
2. Decide whether the change is user-visible at all — see [What not to
   record](#what-not-to-record). If it is not, skip silently; do not add an
   entry to say nothing changed.
3. Add a bullet under the right heading, creating the heading if `[Unreleased]`
   does not have it yet. Keep headings in this order:

   | Heading          | For                                                                                                       |
   | ---------------- | --------------------------------------------------------------------------------------------------------- |
   | `### Added`      | new capability that did not exist (`feat:`)                                                               |
   | `### Changed`    | existing behaviour works differently (`feat:` on something existing, `perf:`, architecture worth knowing) |
   | `### Deprecated` | still works, going away                                                                                   |
   | `### Removed`    | capability taken out                                                                                      |
   | `### Fixed`      | broken behaviour corrected (`fix:`)                                                                       |
   | `### Security`   | vulnerability addressed                                                                                   |

4. If the change is breaking, say so in the bullet — start it with
   `**Breaking:**`. Job 2 relies on that marker to pick the bump.

### How to write the bullet

Write for someone using the site or picking the project up later, **not** for
someone reading the diff. The `1.0.0` entry is the reference for tone.

- Lead with the capability, not the file. Bold the feature name when it is a
  section of the site, as the `1.0.0` entry does.
- One bullet per user-visible change, not one per commit. Three commits fixing
  one bug are one bullet.
- Say what it means for a visitor, not which component changed.

```
Good  - **Groups directory** — searchable listing with filters, pagination,
        per-group detail pages, meeting schedules and image galleries.
Good  - Corrected literature paths in search results to include the category segment.
Bad   - Updated GroupsFilterDashboard.tsx and fetchGroups.ts
Bad   - fix: filters reset bug fix
```

Never paste a raw commit subject in as a bullet.

### What not to record

Skip when the change has no effect a user or a future maintainer would notice:
pure refactors with identical behaviour, formatting, dependency bumps that
change nothing observable, test-only changes, CI tweaks, comment edits.

Two exceptions worth an entry under `### Changed` anyway:

- An architectural change someone would need to know about — the feature-based
  restructure and the ISR window are both in `1.0.0` for that reason.
- Anything that alters how the project is set up or run, since that contradicts
  `README.md` if left unrecorded.

## Job 2: Cut a release

Only when the user asks for it. Never bump a version unprompted.

1. **Derive the bump** from what has accumulated under `[Unreleased]`, taking
   the highest that applies:

   | Found in `[Unreleased]`                            | Bump  | From 1.0.0 |
   | -------------------------------------------------- | ----- | ---------- |
   | any `**Breaking:**` bullet, or a `Removed` heading | major | 2.0.0      |
   | any `Added` heading                                | minor | 1.1.0      |
   | only `Fixed` / `Changed` / `Security`              | patch | 1.0.1      |

   State the version you derived and why before editing anything.

2. **Refuse an empty release.** If `[Unreleased]` has no bullets, say so and
   stop — there is nothing to release.

3. **Promote the section.** Leave `## [Unreleased]` in place and empty above the
   new heading, so the next change has somewhere to go:

   ```
   ## [Unreleased]

   ## [1.1.0] - YYYY-MM-DD
   ```

   Date it today in `YYYY-MM-DD`. Get the real date with `date +%F` rather than
   assuming one.

4. **Bump `package.json`** to the same version. These two must never disagree.

5. **Update the comparison links** at the bottom of `CHANGELOG.md` — add a line
   for the new version and re-point `[unreleased]` at it:

   ```
   [unreleased]: https://github.com/maraa-techteam/international-assembly-frontend/compare/v1.1.0...HEAD
   [1.1.0]: https://github.com/maraa-techteam/international-assembly-frontend/compare/v1.0.0...v1.1.0
   ```

6. **Verify** before reporting done:

   ```bash
   node -e "console.log(require('./package.json').version)"   # matches the new heading
   npx prettier --check CHANGELOG.md package.json
   ```

7. **Tell the user the tag is not created.** This repo has no git tags at all,
   so every comparison link 404s until one exists. Offer the commands, do not
   run them unasked — tagging and pushing are outward-facing:

   ```bash
   git tag -a v1.1.0 -m "Release 1.1.0"
   git push origin v1.1.0
   ```

## Notes

- `CHANGELOG.md` is Prettier-formatted like everything else; the pre-commit hook
  will rewrite it, so match the existing style to keep the diff clean.
- The `0.1.0` entry is preserved verbatim, typo and all. Do not tidy historical
  entries — a changelog is a record, not a document to edit.
- `1.0.0` covers all work up to 2026-09-02 as a single entry because nothing was
  tagged before it. Later releases should be normal-sized, not retrospectives.
