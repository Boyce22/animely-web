# Git Flow Protocol — TSUAA

All TSUAA agents **must** follow this protocol. Violations (e.g. `main` ahead of `develop`) are automatically detected and block CI.

## Branch Model

```
main        ─────●────────────────────●── (production)
                  \                  /
develop     ──●────●────●────●────●── (integration)
               \  /      \  /
feature/*    ───●──      ──●──
```

| Branch        | Purpose                         | Source        | Merges into     |
|---------------|---------------------------------|---------------|-----------------|
| `main`        | Production-ready releases       | `develop`     | (none)          |
| `develop`     | Integration branch              | `feature/*`   | `main`          |
| `feature/*`   | New features (short-lived)      | `develop`     | `develop`       |
| `hotfix/*`    | Urgent production fixes         | `main`        | `main` + `develop` |
| `release/*`   | Release preparation             | `develop`     | `main` + `develop` |

## Ground Rules

1. **`main` must NEVER be ahead of `develop`.** If `main` receives a commit (hotfix or direct push), `develop` must be updated immediately via `git merge main`.
2. **All code enters via `develop`.** Feature branches branch off `develop` and merge back into `develop` via PR.
3. **Only release or hotfix merges touch `main`.** No direct commits, no feature PRs targeting `main`.
4. **After merging into `main`, always merge `main` back into `develop`.** This keeps the branches synchronized.
5. **Rebase before merging.** Feature branches should be rebased onto `develop` before merge to keep history linear.

## Verification

Run this to detect violations:

```bash
# Quick content check (recommended — avoids false positives from release merge commits)
git diff main develop --quiet || echo "WARNING: content diverged"

# Detailed commit ancestry check (use when content check fails)
git log --oneline --left-right main...develop
```

If `git diff` reports divergence and commits exist on the `main` side (`<`) that are not on `develop`, the protocol is **violated**.

Fix:

```bash
git checkout develop
git merge main
git push origin develop
```

> **Note:** Release merge commits on `main` that have identical content in `develop` are NOT violations. The check uses content comparison (`git diff`) to avoid false positives.

## CI Enforcement

A content-aware check is defined in [`.github/workflows/git-flow-check.yml`](../.github/workflows/git-flow-check.yml). The CI pipeline:

1. First checks content equality: `git diff main develop --quiet`
2. If content is identical, exits early (✅ OK — release merge commits are allowed)
3. If content differs AND `main` has commits not in `develop`, it fails (❌ violation)

## Pre-Push Hook (recommended for all agents)

Place this in `.git/hooks/pre-push` on every clone:

```bash
#!/bin/bash
# Content-aware Git Flow check — prevents false positives from release merge commits
while read local_ref local_sha remote_ref remote_sha; do
  if [ "$remote_ref" = "refs/heads/main" ]; then
    if ! git diff origin/main origin/develop --quiet 2>/dev/null; then
      if git rev-list --count origin/develop..origin/main 2>/dev/null | grep -q '[1-9]'; then
        echo "BLOCKED: main has content commits not in develop. Merge main into develop first."
        exit 1
      fi
    fi
  fi
done
exit 0
```

Make it executable: `chmod +x .git/hooks/pre-push`

## Responsibilities

| Role          | Responsibility                                             |
|---------------|------------------------------------------------------------|
| All agents    | Follow branch model; never commit directly to `main`       |
| CTO           | Enforce protocol; audit branches; maintain CI checks       |
| SeniorBackend | Ensure CI Git Flow check runs on every push                |
