"use client";

import { Car, rowAccent } from "@/lib/mock-data";
import { StatusBadge } from "./StatusBadge";
import { LabelChips } from "./LabelChips";

interface CarCardProps {
  car: Car;
  isActive?: boolean;
  onSelect?: (car: Car) => void;
}

export function CarCard({ car, isActive, onSelect }: CarCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(car)}
      className={`w-full text-left rounded-xl border border-border p-3.5 transition-colors active:scale-[0.99] ${rowAccent(
        car.status
      )} ${isActive ? "ring-2 ring-accent/70" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <StatusBadge status={car.status} />
        <span className="font-mono text-sm font-bold tracking-wide text-foreground">
          {car.tag}
        </span>
      </div>

      <div className="mt-2.5 flex items-center gap-3">
        <div
          className="h-9 w-9 shrink-0 rounded-lg border border-border shadow-inner"
          style={{ backgroundColor: car.colorHex }}
          title={car.color}
        />
        <div className="min-w-0">
          <p className="font-semibold text-[15px] leading-tight truncate">
            {car.year} {car.model}
          </p>
          <p className="text-xs text-muted truncate">
            {car.trim} · {car.color}
          </p>
        </div>
      </div>

      {car.labels.length > 0 && (
        <div className="mt-2.5">
          <LabelChips labels={car.labels} />
        </div>
      )}

      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        <span className="font-medium text-foreground">{car.location}</span>
        {car.keyTag && <span>Key {car.keyTag}</span>}
        {car.timeInQueue !== "—" && <span>{car.timeInQueue}</span>}
        {car.assignedTo && (
          <span className="text-accent">{car.assignedTo}</span>
        )}
      </div>

      {car.notes && (
        <p className="mt-2 text-xs text-amber-200/90 line-clamp-2">
          {car.notes}
        </p>
      )}
    </button>
  );
}
