# JLR Porter – Carlsbad

Live detailing / prep queue for **Hoehn Jaguar Land Rover Carlsbad** porters.

Mobile-first Next.js app that gives porters instant visibility of the next car to detail, with large touch targets, high-contrast dark UI, and live-style notifications.

## Features

- **Active Task** screen – big status card with location, key tag, notes, timer
- **Live notification** banner when a new high-priority car arrives
- **Queue** view sorted by priority
- One-tap Start / Mark Complete / Report Issue
- Outdoor-friendly dark theme with Land Rover green accent

## Tech

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

A demo high-priority car notification appears ~12 seconds after load.

## Project Structure

```
src/
  app/           # App Router pages & layout
  components/    # UI components (ActiveTask, CarCard, Header, Notification)
  lib/           # Mock data & types
```

## Next Steps (Production)

- Connect to dealership DMS / inventory system
- Real-time via Supabase Realtime or WebSockets
- Push notifications (OneSignal / FCM)
- Badge / PIN login for porters
- Manager dispatcher view

---

Built for Hoehn Jaguar Land Rover Carlsbad.
