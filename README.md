# kimbundu.org

## Project overview
kimbundu.org is a digital language preservation platform for Kimbundu, a historically underdocumented Angolan language. The current release centers on a structured public dictionary corpus and presents it in a searchable, readable, and mobile-friendly interface.

## Mission and context
The project is designed to:
- preserve Kimbundu language knowledge in durable digital form
- make historical lexical material publicly accessible
- support both community use and long-term educational work

The dictionary data comes from historical source material and is published with ongoing editorial refinement, so the platform can stay useful while quality continues to improve.

## What is currently implemented
### Core public experience
- Editorial landing page with mission framing and dictionary search entry point
- Search across dictionary lemmas and Portuguese definitions
- Search result pagination
- Entry pages for individual lemmas
- Entry cards with:
  - lemma + homonym handling
  - part-of-speech/subtype/number badges
  - noun class badge (when available)
  - sense list rendering
  - cross-reference chips that jump into dictionary search
  - source metadata (page/column)
  - editorial review status indicator
- Noun class browsing:
  - class index page
  - class detail pages with paginated entries
- About page describing mission and editorial process`n- Dedicated Kimbundu introduction page (`/kimbundu`) for language, people, and cultural context

### Other currently available pages/features
- Beta translator page (`/translate`) with UI present but service intentionally unavailable in current mode
- Locale support for `en`, `fr`, and `pt`
- Firebase + Vercel analytics integration

## Data/source overview
Primary dictionary data is loaded from:
- `dictionary/dictionary_entries_public.json`

This includes:
- top-level corpus metadata (`source`, `generated_at`, `entry_count`, note)
- normalized/cleaned lexical entries used for public rendering

Current repository snapshot metadata indicates:
- `entry_count`: 10,649
- `generated_at`: 2026-03-07T00:49:25.095972+00:00

## Development and run instructions
### Prerequisites
- Bun 1.x

### Install
```bash
bun install
```

### Run in development
```bash
bun run dev
```
Then open [http://localhost:3000](http://localhost:3000).

### Build for production
```bash
bun run build
bun run start
```

### Type-check
```bash
bun run type-check
```

## Current architecture overview
- `pages/`
  - route-level pages (`/`, `/search`, `/word/[kimbunduText]`, `/classes`, `/about`, `/translate`)
- `components/`
  - shared layout shell
  - dictionary entry/search/class UI blocks
  - reusable UI primitives under `components/ui/`
- `fetch-data/`
  - server-side dictionary querying and projection into public entry shape
- `dictionary/`
  - public dictionary JSON corpus
- `helpers/`
  - noun class metadata helpers
- `types/`
  - canonical/public dictionary entry TypeScript types

## Future roadmap (planned, not yet implemented)
The items below are planned directions and are **not fully implemented yet**:

- Improved editorial correction and validation workflows
- Deeper English and French translation enrichment for dictionary entries
- Bible text integration in Kimbundu with linked lookup
- New Testament audio integration
- Folk tales and story collections in Kimbundu
- Songs and lyric archives in Kimbundu
- Grammar guides and noun-class learning tools
- Linked references between dictionary entries and future learning materials
- Downloadable/open data access for researchers and community builders
- Future structured APIs and LLM-friendly data access paths
- Additional educational features for guided learning, revision, and classroom use

## Notes on scope
Current production scope is dictionary-first. The platform is intentionally built to provide a stable public foundation now, while expanding into broader language-learning and cultural content over time.
