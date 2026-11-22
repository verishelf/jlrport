"use client";

import { PORTER_NAME } from "@/lib/mock-data";

export function Header({ online = true }: { online?: boolean }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-black">
            JLR
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">
              Jaguar Land Rover Carlsbad
            </p>
            <p className="text-xs text-muted">Porter · {PORTER_NAME}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              online ? "bg-emerald-400" : "bg-red-500"
            }`}
          />
          <span className="text-xs text-muted">
            {online ? "Live" : "Offline"}
          </span>
        </div>
      </div>
    </header>
  );
}
