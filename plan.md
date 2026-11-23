# JLR Porter Dashboard Redesign

## Implementation approach

Preserve the existing Next.js App Router and client-side mock data model, while consolidating the active queue experience in `src/app/page.tsx`. The dashboard will use the existing `Car` records as the source of truth for the current session, with typed state transitions for wash status, labels, search/filter state, and new-vehicle creation. No new dependencies are needed.

The page will be structured as a dealership operations shell: branded header, KPI summary, search/filter toolbar, responsive vehicle table on desktop, and stacked vehicle cards on narrow screens. A selected vehicle drawer/panel will provide quick status actions and label management. The existing `src/lib/mock-data.ts` remains the data boundary and is expanded only with compatible optional identifiers needed by the requested search fields.

## Project structure

- `src/app/page.tsx` — interactive dashboard, vehicle management, filtering, labels, and creation dialog.
- `src/app/globals.css` — visual system, responsive table/card layout, status indicators, and controls.
- `src/app/layout.tsx` — metadata and viewport identity.
- `src/lib/mock-data.ts` — typed vehicle records and initial demo data.
- `public/manus-routes.json` — declared application route manifest.

## Design direction

**Design movement:** premium dealership service operations console — 0.04 probability.

**Core principles:** quiet authority, fast scanning, status-first information hierarchy, and touch-friendly controls. White surfaces and graphite typography make vehicle records easy to read; restrained green accents signal the Land Rover/Jaguar context without turning the dashboard into a marketing page. Status is communicated with a colored dot and label, never color alone.

**Color philosophy:** warm white and cool stone gray establish a clean service-lane backdrop. JLR-inspired deep green is reserved for brand and primary actions, while red, amber, and gray are operational signals for wash state. Borders stay soft and shadows are shallow so the table feels precise rather than decorative.

**Layout paradigm:** a full-width operations canvas with a narrow left-aligned content rail on desktop, a pinned summary band, and a dense table that relaxes into cards on mobile. The selected vehicle context remains visible without opening a separate route.

**Signature elements:** compact uppercase section labels, understated green hairline rules, and status pills with a dot-plus-label treatment.

**Interaction philosophy:** direct manipulation over hidden menus. A row can be selected, status can be changed inline, labels can be added or removed in context, and the create flow validates only the fields needed to put a vehicle into the queue.

**Animation:** minimal 150–200ms transitions for focus, selection, and modal entry only; no looping or decorative motion.

**Typography system:** Geist for interface text, Geist Mono for tags and stock identifiers. Strong 12px–14px labels support scanning; vehicle names use a restrained 15px–18px hierarchy.

**Brand essence:** a dependable wash-lane command center for JLR dealership porters; precise, calm, accountable. Voice: operational, concise, respectful. Example lines: “Ready for the next vehicle.” “Status updated — wash bay is in progress.”

**Wordmark & logo:** a compact “JLR / PORTER OPS” lockup with a thin green rule, keeping the dealership identity present without inventing a new consumer brand.

**Signature brand color:** deep British racing green `#0f4a3c`.
