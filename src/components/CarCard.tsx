"use client";

import { Car } from "@/lib/mock-data";
import { PriorityBadge } from "./PriorityBadge";

interface CarCardProps {
  car: Car;
  isActive?: boolean;
  onSelect?: (car: Car) => void;
  compact?: boolean;
}

export function CarCard({ car, isActive, onSelect, compact }: CarCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(car)}
      className={`w-full text-left rounded-2xl border p-4 transition-colors active:scale-[0.99] ${
        isActive
          ? "border-accent/60 bg-accent/10"
          : "border-border bg-card hover:bg-card-hover"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="h-10 w-10 shrink-0 rounded-xl border border-border shadow-inner"
            style={{ backgroundColor: car.colorHex }}
            title={car.color}
          />
          <div className="min-w-0">
            <p className="font-semibold text-base leading-tight truncate">
              {car.year} {car.model}
            </p>
            <p className="text-sm text-muted truncate">
              {car.trim} · {car.color}
            </p>
          </div>
        </div>
        <PriorityBadge priority={car.priority} />
      </div>

      {!compact && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <span className="font-medium text-foreground">{car.location}</span>
          <span>Stock #{car.stockNumber}</span>
          {car.keyTag && <span>Key {car.keyTag}</span>}
          <span>{car.timeInQueue} in queue</span>
        </div>
      )}

      {car.notes && !compact && (
        <p className="mt-2 text-sm text-amber-200/90 line-clamp-2">
          {car.notes}
        </p>
      )}
    </button>
  );
}
