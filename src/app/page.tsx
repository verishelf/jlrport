"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Car, initialCars, PORTER_NAME, WashStatus, rowStyle } from "@/lib/mock-data";

type Filter = "all" | "needs" | "progress" | "complete";

export default function WashQueue() {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [filter, setFilter] = useState<Filter>("needs");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastCar, setToastCar] = useState<Car | null>(null);

  const counts = useMemo(
    () => ({
      needs: cars.filter(
        (c) => c.status === "NEEDS WASH" || c.status === "PRIORITY WASH"
      ).length,
      progress: cars.filter((c) => c.status === "Wash In Progress").length,
      complete: cars.filter((c) => c.status === "WASH COMPLETE").length,
    }),
    [cars]
  );

  const filtered = useMemo(() => {
    let list = [...cars];
    if (filter === "needs") {
      list = list.filter(
        (c) => c.status === "NEEDS WASH" || c.status === "PRIORITY WASH"
      );
    } else if (filter === "progress") {
      list = list.filter((c) => c.status === "Wash In Progress");
    } else if (filter === "complete") {
      list = list.filter((c) => c.status === "WASH COMPLETE");
    }
    return list.sort((a, b) => {
      const order: WashStatus[] = [
        "PRIORITY WASH",
        "NEEDS WASH",
        "Wash In Progress",
        "WASH COMPLETE",
      ];
      return order.indexOf(a.status) - order.indexOf(b.status);
    });
  }, [cars, filter]);

  const selected = cars.find((c) => c.id === selectedId) ?? null;

  useEffect(() => {
    const t = setTimeout(() => {
      const newCar: Car = {
        id: "new-1",
        tag: "TG401",
        year: 2026,
        make: "Land Rover",
        model: "Range Rover Sport",
        trim: "Dynamic SE",
        color: "Santorini Black",
        colorHex: "#1a1a1a",
        location: "Front Line 1",
        status: "PRIORITY WASH",
        labels: ["Has Loaner"],
        notes: "Walk-in — priority detail",
        timeInQueue: "0 min",
        keyTag: "K-300",
        deliveryTime: "ASAP",
      };
      setCars((prev) => [newCar, ...prev]);
      setToastCar(newCar);
      setShowToast(true);
    }, 10000);
    return () => clearTimeout(t);
  }, []);

  const startWash = useCallback((id: string) => {
    setCars((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "Wash In Progress" as const,
              assignedTo: PORTER_NAME,
            }
          : c
      )
    );
    setSelectedId(id);
  }, []);

  const completeWash = useCallback((id: string) => {
    setCars((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: "WASH COMPLETE" as const, timeInQueue: "—" }
          : c
      )
    );
    setSelectedId(null);
    setFilter("complete");
  }, []);

  return (
    <div className="flex min-h-full flex-col bg-[#f4f5f7]">
      <header className="sticky top-0 z-20 border-b border-[#d8dbe0] bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-[15px] font-semibold text-[#1a1a1a]">
              Jaguar Land Rover Carlsbad
            </h1>
            <p className="text-xs text-[#6b7280]">Wash / Detail Queue · {PORTER_NAME}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-[#6b7280]">Live</span>
          </div>
        </div>
      </header>

      {showToast && toastCar && (
        <div className="fixed inset-x-0 top-14 z-50 mx-auto max-w-2xl px-3">
          <div className="rounded-lg border border-red-200 bg-white p-3 shadow-lg">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-red-600">
                  New Priority Wash
                </p>
                <p className="text-xs text-[#6b7280]">
                  {toastCar.tag} · {toastCar.year} {toastCar.model}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(toastCar.id);
                    setShowToast(false);
                    setFilter("needs");
                  }}
                  className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => setShowToast(false)}
                  className="rounded-md border border-[#d8dbe0] px-3 py-1.5 text-xs font-medium text-[#6b7280]"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-2xl flex-1 px-3 pb-24 pt-3">
        <div className="mb-3 flex gap-1 rounded-lg border border-[#d8dbe0] bg-white p-1">
          {(
            [
              { id: "needs" as const, label: `Needs Wash (${counts.needs})` },
              { id: "progress" as const, label: `In Progress (${counts.progress})` },
              { id: "complete" as const, label: `Complete (${counts.complete})` },
              { id: "all" as const, label: "All" },
            ]
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilter(t.id)}
              className={`flex-1 rounded-md py-2 text-[11px] font-semibold transition-colors ${
                filter === t.id
                  ? "bg-[#0d6efd] text-white"
                  : "text-[#6b7280] hover:bg-[#f0f1f3]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {selected && (
          <div className="mb-3 rounded-lg border border-[#d8dbe0] bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-[11px] font-bold uppercase ${rowStyle(
                      selected.status
                    )}`}
                  >
                    {selected.status}
                  </span>
                  <span className="font-mono text-sm font-bold">{selected.tag}</span>
                </div>
                <p className="mt-1.5 text-base font-semibold">
                  {selected.year} {selected.model}
                </p>
                <p className="text-sm text-[#6b7280]">
                  {selected.trim} · {selected.color}
                </p>
              </div>
              <div
                className="h-12 w-12 shrink-0 rounded-lg border border-[#d8dbe0]"
                style={{ backgroundColor: selected.colorHex }}
              />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-md bg-[#f4f5f7] px-2.5 py-2">
                <p className="text-[10px] uppercase text-[#6b7280]">Location</p>
                <p className="font-semibold">{selected.location}</p>
              </div>
              <div className="rounded-md bg-[#f4f5f7] px-2.5 py-2">
                <p className="text-[10px] uppercase text-[#6b7280]">Key Tag</p>
                <p className="font-semibold">{selected.keyTag ?? "—"}</p>
              </div>
            </div>

            {selected.labels.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {selected.labels.map((l) => (
                  <span
                    key={l}
                    className="rounded bg-red-600 px-2 py-0.5 text-[11px] font-semibold text-white"
                  >
                    {l}
                  </span>
                ))}
              </div>
            )}

            {selected.notes && (
              <p className="mt-2.5 text-sm text-[#6b7280]">{selected.notes}</p>
            )}

            <div className="mt-4 flex gap-2">
              {(selected.status === "NEEDS WASH" ||
                selected.status === "PRIORITY WASH") && (
                <button
                  type="button"
                  onClick={() => startWash(selected.id)}
                  className="flex-1 rounded-md bg-[#0d6efd] py-2.5 text-sm font-semibold text-white"
                >
                  Start Wash
                </button>
              )}
              {selected.status === "Wash In Progress" && (
                <button
                  type="button"
                  onClick={() => completeWash(selected.id)}
                  className="flex-1 rounded-md bg-emerald-600 py-2.5 text-sm font-semibold text-white"
                >
                  Mark Complete
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="rounded-md border border-[#d8dbe0] px-4 py-2.5 text-sm font-medium text-[#6b7280]"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-lg border border-[#d8dbe0] bg-white shadow-sm">
          <div className="grid grid-cols-[1fr_70px_1fr] gap-2 border-b border-[#d8dbe0] bg-[#f8f9fa] px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
            <span>Status</span>
            <span>Tag#</span>
            <span>Labels</span>
          </div>

          {filtered.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-[#6b7280]">
              No vehicles in this status
            </div>
          ) : (
            filtered.map((car) => (
              <button
                key={car.id}
                type="button"
                onClick={() => setSelectedId(car.id)}
                className={`grid w-full grid-cols-[1fr_70px_1fr] items-center gap-2 border-b border-[#eef0f3] px-3 py-2.5 text-left transition-colors last:border-b-0 ${
                  selectedId === car.id ? "bg-blue-50" : "hover:bg-[#f8f9fa]"
                } ${
                  car.status === "PRIORITY WASH" || car.status === "NEEDS WASH"
                    ? "bg-red-50/60"
                    : car.status === "Wash In Progress"
                    ? "bg-amber-50/70"
                    : ""
                }`}
              >
                <div>
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-[11px] font-bold uppercase ${rowStyle(
                      car.status
                    )}`}
                  >
                    {car.status}
                  </span>
                  <p className="mt-1 text-xs text-[#6b7280] truncate">
                    {car.year} {car.model}
                  </p>
                </div>
                <span className="font-mono text-sm font-bold text-[#1a1a1a]">
                  {car.tag}
                </span>
                <div className="flex flex-wrap gap-1">
                  {car.labels.length === 0 ? (
                    <span className="text-xs text-[#9ca3af]">—</span>
                  ) : (
                    car.labels.map((l) => (
                      <span
                        key={l}
                        className="rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold text-white"
                      >
                        {l}
                      </span>
                    ))
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </main>

      <footer className="fixed bottom-0 inset-x-0 border-t border-[#d8dbe0] bg-white px-4 py-2.5 text-center text-[11px] text-[#6b7280]">
        Jaguar Land Rover Carlsbad · Wash Queue
      </footer>
    </div>
  );
}
