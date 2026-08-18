# Myanmar Astrology — Version 1

A frontend-only React application for documented Myanmar weekday astrology and a transparent, application-defined compatibility score.

## Features

- Personal weekday astrology associations: weekday sign, planetary ruler, animal, and direction.
- Love compatibility based only on approved, unambiguous traditional weekday pairs.
- Burmese-friendly responsive interface.

Personality readings, Mahabote interpretation, and separate relationship-dimension percentages remain unavailable until reliable rules are approved.

## Architecture

```text
React pages and feature components
  → services
    → calculation utilities
      → traditional rule data / custom scoring data
```

Traditional astrology mappings and application-defined scoring constants are kept in separate files under `src/data`.

## Commands

- `npm run dev` — start local development.
- `npm test` — run deterministic calculation tests.
- `npm run lint` — run static lint checks.
- `npm run build` — type-check and create the production bundle.

No backend, database, authentication, external API, or secret configuration is required.
