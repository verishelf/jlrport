"use client";

import { Car } from "@/lib/mock-data";
import { PriorityBadge } from "./PriorityBadge";

interface NotificationBannerProps {
  car: Car;
  onAccept: () => void;
  onDismiss: () => void;
}

export function NotificationBanner({
  car,
  onAccept,
  onDismiss,
}: NotificationBannerProps) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 animate-in slide-in-from-top duration-300">
      <div className="mx-auto max-w-lg border-b border-accent/50 bg-zinc-900/95 px-4 py-4 shadow-2xl backdrop-blur-lg">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-lg">
            🔔
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold">New car ready</p>
              <PriorityBadge priority={car.priority} />
            </div>
            <p className="mt-0.5 text-sm text-muted">
              {car.year} {car.model} · {car.location}
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={onAccept}
            className="flex-1 rounded-xl bg-accent py-2.5 text-sm font-semibold text-black"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
