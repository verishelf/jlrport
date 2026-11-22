"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Car, initialCars, PORTER_NAME, WashStatus, rowStyle } from "@/lib/mock-data";

const STATUS_ORDER: WashStatus[] = [
  "PRIORITY WASH",
  "NEEDS WASH",
  "Wash In Progress",
  "WASH COMPLETE",
];

export default function WashQueue() {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastCar, setToastCar] = useState<Car | null>(null);

  const sorted = useMemo(() => {
    return [...cars].sort(
      (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
    );
  }, [cars]);

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

  const updateStatus = useCallback((id: string, status: WashStatus) => {
    setCars((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const next = { ...c, status };
        if (status === "Wash In Progress") {
          next.assignedTo = PORTER_NAME;
        }
        if (status === "WASH COMPLETE") {
          next.timeInQueue = "—";
        }
        return next;
      })
    );
  }, []);

  const startWash = useCallback(
    (id: string) => {
      updateStatus(id, "Wash In Progress");
      setSelectedId(id);
    },
    [updateStatus]
  );

  const completeWash = useCallback(
    (id: string) => {
      updateStatus(id, "WASH COMPLETE");
      setSelectedId(null);
    },
    [updateStatus]
  );

  return (
    <div className="flex min-h-full flex-col bg-[#f0f1f3]">
      <header className="sticky top-0 z-20 border-b border-[#c8ccd2] bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-2.5">
          <div>
            <h1 className="text-[15px] font-semibold text-[#1a1a1a] leading-tight">
              Jaguar Land Rover Carlsbad
            </h1>
            <p className="text-[11px] text-[#6b7280]">
              Wash / Detail · {PORTER_NAME}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-[#6b7280]">Live</span>
          </div>
        </div>
      </header>

      {showToast && toastCar && (
        <div className="fixed inset-x-0 top-12 z-50 mx-auto max-w-2xl px-3">
          <div className="rounded-md border border-red-300 bg-white p-3 shadow-lg">
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
                  }}
                  className="rounded bg-red-600 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => setShowToast(false)}
                  className="rounded border border-[#c8ccd2] px-3 py-1.5 text-xs font-medium text-[#6b7280]"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-2xl flex-1 px-0 pb-20 pt-0">
        {selected && (
          <div className="mx-3 mt-3 mb-2 rounded-md border border-[#c8ccd2] bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-[11px] font-bold uppercase ${rowStyle(
                      selected.status
                    )}`}
                  >
                    {selected.status}
                  </span>
                  <span className="font-mono text-sm font-bold">
                    {selected.tag}
                  </span>
                </div>
                <p className="mt-1.5 text-[15px] font-semibold truncate">
                  {selected.year} {selected.model}
                </p>
                <p className="text-xs text-[#6b7280]">
                  {selected.trim} · {selected.color}
                </p>
              </div>
              <div
                className="h-11 w-11 shrink-0 rounded border border-[#c8ccd2]"
                style={{ backgroundColor: selected.colorHex }}
              />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded bg-[#f4f5f7] px-2.5 py-2">
                <p className="text-[10px] uppercase tracking-wide text-[#6b7280]">
                  Location
                </p>
                <p className="font-semibold">{selected.location}</p>
              </div>
              <div className="rounded bg-[#f4f5f7] px-2.5 py-2">
                <p className="text-[10px] uppercase tracking-wide text-[#6b7280]">
                  Key Tag
                </p>
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
              <p className="mt-2 text-sm text-[#6b7280]">{selected.notes}</p>
            )}

            <div className="mt-3 flex gap-2">
              {(selected.status === "NEEDS WASH" ||
                selected.status === "PRIORITY WASH") && (
                <button
                  type="button"
                  onClick={() => startWash(selected.id)}
                  className="flex-1 rounded bg-[#0d6efd] py-2.5 text-sm font-semibold text-white"
                >
                  Start Wash
                </button>
              )}
              {selected.status === "Wash In Progress" && (
                <button
                  type="button"
                  onClick={() => completeWash(selected.id)}
                  className="flex-1 rounded bg-emerald-600 py-2.5 text-sm font-semibold text-white"
                >
                  Mark Complete
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="rounded border border-[#c8ccd2] px-4 py-2.5 text-sm font-medium text-[#6b7280]"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="overflow-hidden border-y border-[#c8ccd2] bg-white sm:mx-3 sm:mt-3 sm:rounded-md sm:border">
          <div className="grid grid-cols-[minmax(0,1.4fr)_64px_minmax(0,1fr)] gap-1 border-b border-[#c8ccd2] bg-[#eef0f3] px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-[#5a6270]">
            <span>Inspection Status</span>
            <span>Tag#</span>
            <span>Labels</span>
          </div>

          {sorted.map((car) => {
            const isNeeds =
              car.status === "NEEDS WASH" || car.status === "PRIORITY WASH";
            const isProgress = car.status === "Wash In Progress";
            const isComplete = car.status === "WASH COMPLETE";

            return (
              <div
                key={car.id}
                className={`grid grid-cols-[minmax(0,1.4fr)_64px_minmax(0,1fr)] items-center gap-1 border-b border-[#e4e6ea] px-2 py-1.5 last:border-b-0 ${
                  selectedId === car.id ? "ring-2 ring-inset ring-blue-400" : ""
                } ${
                  isNeeds
                    ? "bg-[#fce8e8]"
                    : isProgress
                    ? "bg-[#fef6d9]"
                    : isComplete
                    ? "bg-[#f5f5f5]"
                    : "bg-white"
                }`}
              >
                <div className="min-w-0">
                  <select
                    value={car.status}
                    onChange={(e) =>
                      updateStatus(car.id, e.target.value as WashStatus)
                    }
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full max-w-full truncate rounded border-0 px-2 py-1.5 text-[11px] font-bold uppercase appearance-none cursor-pointer ${rowStyle(
                      car.status
                    )}`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000' fill-opacity='0.4' d='M3 4.5L6 8l3-3.5'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 6px center",
                      paddingRight: "20px",
                    }}
                  >
                    <option value="PRIORITY WASH">PRIORITY WASH</option>
                    <option value="NEEDS WASH">NEEDS WASH</option>
                    <option value="Wash In Progress">Wash In Progress</option>
                    <option value="WASH COMPLETE">WASH COMPLETE</option>
                  </select>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedId(selectedId === car.id ? null : car.id)
                    }
                    className="mt-0.5 block w-full truncate text-left text-[11px] text-[#5a6270] hover:text-[#1a1a1a]"
                  >
                    {car.year} {car.model}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedId(selectedId === car.id ? null : car.id)
                  }
                  className="font-mono text-[13px] font-bold text-[#1a1a1a] text-left"
                >
                  {car.tag}
                </button>

                <div className="flex flex-wrap items-center gap-1">
                  {car.labels.length === 0 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedId(selectedId === car.id ? null : car.id)
                      }
                      className="flex h-6 w-6 items-center justify-center rounded border border-[#c8ccd2] text-sm text-[#9ca3af] hover:bg-white"
                    >
                      +
                    </button>
                  ) : (
                    <>
                      {car.labels.map((l) => (
                        <span
                          key={l}
                          className="rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold leading-tight text-white"
                        >
                          {l}
                        </span>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedId(selectedId === car.id ? null : car.id)
                        }
                        className="flex h-5 w-5 items-center justify-center rounded border border-[#c8ccd2] text-xs text-[#9ca3af] hover:bg-white"
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="fixed bottom-0 inset-x-0 border-t border-[#c8ccd2] bg-white px-4 py-2 text-center text-[11px] text-[#6b7280]">
        Jaguar Land Rover Carlsbad · Wash Queue
      </footer>
    </div>
  );
}
