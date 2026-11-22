"use client";

import { Car } from "@/lib/mock-data";
import { PriorityBadge } from "./PriorityBadge";

interface ActiveTaskProps {
  car: Car | null;
  onStart: () => void;
  onComplete: () => void;
  onCantFind: () => void;
  isWorking: boolean;
  elapsed: number;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function ActiveTask({
  car,
  onStart,
  onComplete,
  onCantFind,
  isWorking,
  elapsed,
}: ActiveTaskProps) {
  if (!car) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 text-3xl">
          🚗
        </div>
        <h2 className="text-xl font-semibold">Waiting for next car</h2>
        <p className="mt-2 text-muted">
          You’ll get a live notification when a vehicle is ready for detailing.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-accent/40 bg-gradient-to-b from-accent/10 to-card p-5 shadow-lg shadow-accent/5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          {isWorking ? "In Progress" : "Next Car"}
        </span>
        <PriorityBadge priority={car.priority} />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div
          className="h-16 w-16 shrink-0 rounded-2xl border-2 border-border shadow-lg"
          style={{ backgroundColor: car.colorHex }}
        />
        <div>
          <h2 className="text-2xl font-bold leading-tight">
            {car.year} {car.model}
          </h2>
          <p className="text-muted">
            {car.trim} · {car.color}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-black/30 px-3 py-2">
          <p className="text-muted text-xs">Location</p>
          <p className="font-semibold text-lg">{car.location}</p>
        </div>
        <div className="rounded-xl bg-black/30 px-3 py-2">
          <p className="text-muted text-xs">Key Tag</p>
          <p className="font-semibold text-lg">{car.keyTag ?? "—"}</p>
        </div>
        <div className="rounded-xl bg-black/30 px-3 py-2">
          <p className="text-muted text-xs">Stock #</p>
          <p className="font-semibold">{car.stockNumber}</p>
        </div>
        <div className="rounded-xl bg-black/30 px-3 py-2">
          <p className="text-muted text-xs">
            {isWorking ? "Elapsed" : "In Queue"}
          </p>
          <p className="font-semibold font-mono text-lg">
            {isWorking ? formatTime(elapsed) : car.timeInQueue}
          </p>
        </div>
      </div>

      {car.notes && (
        <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-sm text-amber-100">
          {car.notes}
        </div>
      )}

      {car.deliveryTime && (
        <p className="mt-3 text-center text-sm font-medium text-accent">
          Delivery target: {car.deliveryTime}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {!isWorking ? (
          <button type="button" onClick={onStart} className="btn-primary w-full">
            Start Detailing
          </button>
        ) : (
          <button
            type="button"
            onClick={onComplete}
            className="btn-primary w-full bg-emerald-500"
          >
            Mark Complete
          </button>
        )}
        <button type="button" onClick={onCantFind} className="btn-danger w-full">
          Can&apos;t Find Car / Issue
        </button>
      </div>
    </div>
  );
}
