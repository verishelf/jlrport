"use client";

import { Car, rowAccent } from "@/lib/mock-data";
import { StatusBadge } from "./StatusBadge";
import { LabelChips } from "./LabelChips";

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
      <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 text-3xl">
          🚗
        </div>
        <h2 className="text-xl font-semibold">No active wash</h2>
        <p className="mt-2 text-muted text-sm">
          Select a car from the queue or wait for a Priority Wash notification.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-border p-5 shadow-lg ${rowAccent(
        car.status
      )}`}
    >
      <div className="flex items-center justify-between gap-2">
        <StatusBadge status={car.status} />
        <span className="font-mono text-lg font-bold tracking-wider">
          {car.tag}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div
          className="h-14 w-14 shrink-0 rounded-xl border-2 border-border shadow-lg"
          style={{ backgroundColor: car.colorHex }}
        />
        <div>
          <h2 className="text-xl font-bold leading-tight">
            {car.year} {car.model}
          </h2>
          <p className="text-sm text-muted">
            {car.trim} · {car.color}
          </p>
        </div>
      </div>

      {car.labels.length > 0 && (
        <div className="mt-3">
          <LabelChips labels={car.labels} />
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2.5 text-sm">
        <div className="rounded-xl bg-black/40 px-3 py-2.5">
          <p className="text-[11px] text-muted uppercase tracking-wide">
            Location
          </p>
          <p className="font-semibold text-base">{car.location}</p>
        </div>
        <div className="rounded-xl bg-black/40 px-3 py-2.5">
          <p className="text-[11px] text-muted uppercase tracking-wide">
            Key Tag
          </p>
          <p className="font-semibold text-base">{car.keyTag ?? "—"}</p>
        </div>
        <div className="rounded-xl bg-black/40 px-3 py-2.5">
          <p className="text-[11px] text-muted uppercase tracking-wide">
            {isWorking ? "Elapsed" : "In Queue"}
          </p>
          <p className="font-semibold font-mono text-base">
            {isWorking ? formatTime(elapsed) : car.timeInQueue}
          </p>
        </div>
        <div className="rounded-xl bg-black/40 px-3 py-2.5">
          <p className="text-[11px] text-muted uppercase tracking-wide">
            Assigned
          </p>
          <p className="font-semibold text-base">
            {car.assignedTo ?? "—"}
          </p>
        </div>
      </div>

      {car.notes && (
        <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-sm text-amber-100">
          {car.notes}
        </div>
      )}

      {car.deliveryTime && (
        <p className="mt-2.5 text-center text-sm font-medium text-accent">
          Delivery target: {car.deliveryTime}
        </p>
      )}

      <div className="mt-5 flex flex-col gap-2.5">
        {!isWorking &&
          (car.status === "NEEDS WASH" || car.status === "PRIORITY WASH") && (
            <button
              type="button"
              onClick={onStart}
              className="btn-primary w-full"
            >
              Start Wash
            </button>
          )}

        {isWorking && (
          <button
            type="button"
            onClick={onComplete}
            className="btn-primary w-full !bg-emerald-500"
          >
            Mark Wash Complete
          </button>
        )}

        <button
          type="button"
          onClick={onCantFind}
          className="btn-danger w-full"
        >
          Can&apos;t Find / Report Issue
        </button>
      </div>
    </div>
  );
}
