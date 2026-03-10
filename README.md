# kimbundu.org

## Overview
`kimbundu.org` is a dictionary-first language preservation project for Kimbundu. The current application publishes a structured public corpus of Kimbundu-Portuguese dictionary entries and wraps it in a searchable, multilingual, mobile-friendly web interface.

The repository is currently optimized for public read access, editorial transparency, and low operational complexity. It is not yet a full language-learning platform, translation system, or editorial CMS.

## What is live in this repository
Current routes and user-facing features confirmed in code:

- `/` landing page with dictionary search, featured entries, and project framing
- `/search` paginated full-text search over lemmas and Portuguese definitions
- `/word/[kimbunduText]` entry detail pages with variant pagination
- `/browse` alphabetical browsing by first letter
- `/classes` noun class index
- `/classes/[classIndex]` noun class detail pages with paginated entries
- `/about` project mandate, editorial approach, and future direction
- `/kimbundu` introductory page about the language and cultural context
- built-in locale routing for `en`, `fr`, and `pt`
- optional Firebase analytics and Vercel Speed Insights instrumentation
- PWA manifest and app icons in `public/`

Not currently present:

- no `/translate` route
- no external database
- no write-capable API
- no automated test suite or lint script

## Current data snapshot
Primary data source:

- `dictionary/dictionary_entries_public.json`

The checked-in corpus currently reports:

- `generated_at`: `2026-03-10T20:52:12.620827+00:00`
- `entry_count`: `10679`
- source note: slim public export built from the merged editorial corpus

The payload includes top-level corpus metadata plus a normalized entry list. Server-side code projects that canon shape into a smaller public shape before sending entries to the client.

## Current tech stack
Confirmed stack in the current repo:

- Next.js `14.2.18`
- React `18.3.1`
- TypeScript `5.6.3`
- Next.js Pages Router with `getServerSideProps`
- Tailwind CSS `4.2.1` via `@tailwindcss/postcss`
- shadcn-style component setup in `components/ui/`, backed by Base UI primitives where used
- `clsx` + `tailwind-merge` for class composition
- `lucide-react` for icons
- Firebase Web SDK for optional analytics events
- `@vercel/speed-insights` for performance telemetry
- Bun lockfile for dependency installation
- Node `24.x` declared as the runtime engine

## Technical decisions already made
### 1. Keep the app on Next.js Pages Router
This project is implemented in `pages/`, not the App Router. That matches the current product shape:

- a small number of route-level pages
- query-string driven search and pagination
- straightforward locale routing through `next.config.js`
- simple deployment on Vercel/Node without introducing RSC or server actions

### 2. Serve the dictionary from a checked-in JSON corpus
The app loads `dictionary/dictionary_entries_public.json` directly on the server and keeps it in module memory after first access.

Why this choice fits the current stage:

- deployment stays simple because there is no database dependency
- the public site can ship from a versioned corpus snapshot
- editorial work can happen upstream, with the site consuming a stable export
- search and browse behavior stays deterministic across environments

### 3. Separate canonical entry shape from public entry shape
`types/dictionary.ts` defines a richer canon type and a slimmer client-facing type. `fetch-data/dictionary-server.ts` performs that projection.

Why this matters:

- raw editorial/source structure stays server-side
- the UI receives only the fields it needs
- future internal metadata changes are less likely to leak into page components

### 4. Use server-side rendering for dictionary pages
Search, browse, class, and entry pages currently use `getServerSideProps`.

The practical reason is simple:

- results depend on query params and route params
- the source corpus is local and synchronous to read
- SSR keeps implementation direct without adding a client-side data layer

### 5. Use Tailwind 4 with a custom token layer
Styling is centralized in `styles/globals.css` with CSS variables, custom theme tokens, and shared surface/typography utilities.

Why this appears intentional:

- fast iteration for content-heavy UI
- consistent branding and editorial presentation
- enough structure to share primitives without introducing a heavier design system

### 6. Introduce reusable UI primitives incrementally
`components/ui/` and `components.json` show a shadcn-style setup, and the current UI already uses a subset of those primitives, most visibly `Card` and `Table` in the noun class experience.

This is not a full migration yet, but the adopted direction is clear:

- standardize repeated UI patterns gradually
- keep custom components where the dictionary UX is still bespoke
- avoid a risky full rewrite of the existing interface

### 7. Keep analytics optional
Firebase analytics initialization is gated by `NEXT_PUBLIC_FIREBASE_CONFIG`, and Vercel Speed Insights is mounted globally in `_app.tsx`.

Why this is a sensible current decision:

- production telemetry is available when configured
- local development and unconfigured environments still run without Firebase
- analytics concerns stay isolated from dictionary logic

### 8. Standardize installs with Bun while keeping Node as the runtime target
The repo includes `bun.lock` and documents Bun-based workflows, but `package.json` declares Node `24.x` and uses standard Next.js scripts.

What that means today:

- Bun is the package manager workflow in this repo snapshot
- the application runtime target is still conventional Node/Next.js hosting

## Architecture map
- `pages/`: route entrypoints and SSR page assembly
- `components/`: layout shell, dictionary UI, shared empty states, pagination, search, and UI primitives
- `fetch-data/`: dictionary query helpers and route-facing data adapters
- `dictionary/`: checked-in public corpus snapshot
- `helpers/`: noun class metadata and mapping helpers
- `types/`: canonical and public TypeScript entry contracts
- `utils/firebase.ts`: environment-gated Firebase bootstrap
- `styles/globals.css`: theme tokens and global Tailwind styling

## Decisions still in the pipeline
These are the main areas where the repo shows direction, but the final implementation choice is not fully settled yet.

### 1. Data delivery beyond the checked-in JSON file
Right now the app is JSON-first and read-only. If the platform needs live editorial updates, external consumers, or richer integrations, the project will need to decide between:

- keeping file-based exports as the single source of truth
- adding a structured API layer
- introducing a database or content backend

No such service exists in the current repo.

### 2. Whether to stay on Pages Router long term
The current choice is coherent, but an eventual move to the App Router has not happened. That remains open if the project later needs:

- React Server Components
- streaming/server actions
- more granular layout composition
- different caching behavior

There is no evidence of an active migration yet, so this should be treated as an open decision, not a planned rewrite.

### 3. UI system consolidation
The codebase is in a mixed state:

- some screens rely on the newer `components/ui/` primitives
- others still use hand-rolled markup and utility classes

The pending decision is whether to finish consolidating on the newer component layer or continue with a hybrid approach.

### 4. Tooling strictness and quality gates
Current signals:

- `strict` is `false` in `tsconfig.json`
- there is no lint script
- there are no automated tests in the repo

That does not block the current site, but the project still needs to decide how much engineering hardening it wants before broader feature growth.

### 5. Product expansion beyond the dictionary
The content pages clearly point toward future work, but those areas are not implemented in this repo yet:

- audio and pronunciation material
- example sentences and learning content
- community feedback or contribution flows
- broader cultural archives such as stories, songs, and linked texts
- structured APIs or export paths for downstream use

## Local development
### Prerequisites
- Bun `1.x`
- Node `24.x`

### Install
```bash
bun install
```

### Run locally
```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build
```bash
bun run build
bun run start
```

### Type-check
```bash
bun run type-check
```

## Scope note
This repository currently represents a stable public dictionary application with editorially aware read access. It already contains some infrastructure for broader evolution, but the shipped system is still intentionally narrow: searchable corpus first, richer language platform later.

