# CI/CD Roadmap — Catalyst Codex / Awakening

## Current Architecture (as of June 2026)

- **Frontend**: React + TypeScript + Vite → A2 Hosting (`separrone.com/awakening`)
- **Auth**: Firebase Authentication (email + Google sign-in)
- **Database**: Firestore — direct client-side access, no backend server
- **Firebase Project**: `catalyst-codex-db`
- **Backend**: Spring Boot on `awakening-prod-sparr` Cloud Run — dormant, not in active use

---

## What's Already Done

### Deployment Pipeline
- [x] GitHub Actions workflow (`.github/workflows/deploy.yml`) — triggers on push to `main`
- [x] Vite build with Firebase config injected from GitHub Secrets
- [x] rsync deployment over SSH to A2 Hosting
- [x] All GitHub Secrets configured (`VITE_FIREBASE_*`, `A2_*`, `SSH_PRIVATE_KEY`)

### Firebase Setup
- [x] Firebase Auth — email/password + Google sign-in enabled
- [x] Firestore security rules — public reads, auth-gated writes, `authorId` validation on create
- [x] Firebase config in `.env.local` for local dev (gitignored)

---

## What's Still To Do

### CI Workflow (no CI exists yet — only CD)
- [ ] Add `.github/workflows/ci.yml` — run on PRs and pushes to `dev`
  - `npm run build` to catch build failures before merge
  - ESLint check
  - TypeScript type check

### Branch Protection
- [ ] Protect `main` — require PR + passing CI before merge
- [ ] Create `dev` branch for active development

### Testing
- [ ] Component tests for Login, Forum, Thread pages (React Testing Library)
- [ ] Auth flow integration tests
- [ ] Firestore security rules tests (Firebase emulator)

### Monitoring
- [ ] Uptime check (UptimeRobot or similar) for `separrone.com/awakening`
- [ ] Firebase usage alerts (stay within free tier limits)

---

## Firebase Free Tier Limits (catalyst-codex-db)

| Resource | Free Limit | Action if exceeded |
|---|---|---|
| Firestore reads | 50,000 / day | Alert at 80% |
| Firestore writes | 20,000 / day | Alert at 80% |
| Firestore storage | 1 GB | Monitor growth |
| Firebase Auth | Unlimited (Spark plan) | — |

---

## Notes & Decisions Log

**August 2025** — Initial setup: React + Vite frontend, Spring Boot backend (SQLite)

**June 2026** — Major architecture simplification:
- Migrated to fully Firebase architecture (no backend server)
- Frontend was already using Firebase SDK directly; backend was dead weight
- Switched Firebase project from `catalyst-codex-db` to `awakening-prod-sparr`... then reverted: kept `catalyst-codex-db` since frontend was already configured for it
- Backend preserved dormant on Cloud Run (billing disabled) as a fallback
- CI/CD pipeline already existed via GitHub Actions; no changes needed there
