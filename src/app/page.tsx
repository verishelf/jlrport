"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Car, initialCars, PORTER_NAME, WashStatus } from "@/lib/mock-data";

const STATUS_ORDER: WashStatus[] = [
  "PRIORITY WASH",
  "NEEDS WASH",
  "Wash In Progress",
  "WASH COMPLETE",
];

function statusFieldClass(status: WashStatus): string {
  switch (status) {
    case "PRIORITY WASH":
    case "NEEDS WASH":
      return "bg-white text-[#1a1a1a] border border-[#ccc]";
    case "Wash In Progress":
      return "bg-white text-[#1a1a1a] border border-[#ccc]";
    case "WASH COMPLETE":
      return "bg-white text-[#1a1a1a] border border-[#ccc]";
    default:
      return "bg-white text-[#1a1a1a] border border-[#ccc]";
  }
}

function rowBg(status: WashStatus): string {
  switch (status) {
    case "PRIORITY WASH":
    case "NEEDS WASH":
      return "bg-[#e85a5a]";
    case "Wash In Progress":
      return "bg-[#f0d060]";
    case "WASH COMPLETE":
      return "bg-[#e8e8e8]";
    default:
      return "bg-white";
  }
}

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
    }, 12000);
    return () => clearTimeout(t);
  }, []);

  const updateStatus = useCallback((id: string, status: WashStatus) => {
    setCars((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const next = { ...c, status };
        if (status === "Wash In Progress") next.assignedTo = PORTER_NAME;
        if (status === "WASH COMPLETE") next.timeInQueue = "—";
        return next;
      })
    );
  }, []);

  return (
    <div className="flex min-h-full flex-col bg-[#dfe3e8]">
      <header className="bg-[#2c3e50] text-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Jaguar Land Rover Carlsbad</span>
            <span className="text-[10px] text-white/60">▾</span>
          </div>
          <span className="text-[11px] text-white/70">{PORTER_NAME}</span>
        </div>
      </header>

      <div className="border-b border-[#c0c4ca] bg-[#eef1f5]">
        <div className="mx-auto flex max-w-3xl gap-0 overflow-x-auto px-1">
          {["Messages", "Appointments", "Payments", "Inspect", "Video"].map(
            (tab) => (
              <button
                key={tab}
                type="button"
                className={`shrink-0 px-3 py-2.5 text-[13px] font-medium ${
                  tab === "Inspect"
                    ? "border-b-2 border-[#0d6efd] text-[#0d6efd]"
                    : "text-[#5a6270]"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      <div className="border-b border-[#c0c4ca] bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-[#1a1a1a]">
              Joint Inspection
            </span>
            <span className="rounded bg-[#0d6efd] px-1.5 py-0.5 text-[10px] font-bold text-white">
              Live
            </span>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 rounded bg-[#2c3e50] px-3 py-1.5 text-[12px] font-semibold text-white"
          >
            <span className="text-base leading-none">+</span> CREATE
          </button>
        </div>
        <div className="mx-auto max-w-3xl px-3 pb-2">
          <input
            type="search"
            placeholder="Search by RO#, VIN, TAG, Customer Name, Stock#"
            className="w-full rounded border border-[#c0c4ca] bg-white px-3 py-1.5 text-[13px] text-[#1a1a1a] placeholder:text-[#9ca3af] outline-none focus:border-[#0d6efd]"
          />
        </div>
      </div>

      {showToast && toastCar && (
        <div className="fixed inset-x-0 top-28 z-50 mx-auto max-w-3xl px-3">
          <div className="flex items-center justify-between gap-3 rounded border border-red-400 bg-white p-3 shadow-lg">
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
                className="rounded border border-[#c0c4ca] px-3 py-1.5 text-xs font-medium text-[#6b7280]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-3xl flex-1 pb-16">
        {selected && (
          <div className="m-3 rounded border border-[#c0c4ca] bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-mono text-sm font-bold">{selected.tag}</p>
                <p className="text-[15px] font-semibold">
                  {selected.year} {selected.model} {selected.trim}
                </p>
                <p className="text-xs text-[#6b7280]">
                  {selected.color} · {selected.location}
                  {selected.keyTag ? ` · Key ${selected.keyTag}` : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="text-[#6b7280] text-lg leading-none px-1"
              >
                ×
              </button>
            </div>
            {selected.notes && (
              <p className="mt-2 text-xs text-[#6b7280]">{selected.notes}</p>
            )}
            <div className="mt-3 flex gap-2">
              {(selected.status === "NEEDS WASH" ||
                selected.status === "PRIORITY WASH") && (
                <button
                  type="button"
                  onClick={() => {
                    updateStatus(selected.id, "Wash In Progress");
                  }}
                  className="flex-1 rounded bg-[#0d6efd] py-2 text-sm font-semibold text-white"
                >
                  Start Wash
                </button>
              )}
              {selected.status === "Wash In Progress" && (
                <button
                  type="button"
                  onClick={() => {
                    updateStatus(selected.id, "WASH COMPLETE");
                    setSelectedId(null);
                  }}
                  className="flex-1 rounded bg-emerald-600 py-2 text-sm font-semibold text-white"
                >
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        )}

        <div className="overflow-x-auto bg-white">
          <div className="grid min-w-[340px] grid-cols-[1.5fr_72px_1fr] border-b border-[#b0b4ba] bg-[#d8dce2] text-[11px] font-semibold text-[#3a4050]">
            <div className="flex items-center gap-1 px-2 py-2">
              Inspection Status
              <span className="text-[#6b7280]">▾</span>
            </div>
            <div className="px-2 py-2">Tag#</div>
            <div className="px-2 py-2">Labels</div>
          </div>

          {sorted.map((car) => (
            <div
              key={car.id}
              className={`grid min-w-[340px] grid-cols-[1.5fr_72px_1fr] items-center border-b border-[#c8ccd2] ${rowBg(
                car.status
              )} ${selectedId === car.id ? "outline outline-2 outline-blue-500 outline-offset-[-2px]" : ""}`}
            >
              <div className="px-1.5 py-1.5">
                <select
                  value={car.status}
                  onChange={(e) =>
                    updateStatus(car.id, e.target.value as WashStatus)
                  }
                  className={`w-full rounded px-2 py-1.5 text-[12px] font-semibold appearance-none cursor-pointer ${statusFieldClass(
                    car.status
                  )}`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23666' d='M2 3.5L5 7l3-3.5'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 8px center",
                    paddingRight: "22px",
                  }}
                >
                  <option value="PRIORITY WASH">PRIORITY WASH</option>
                  <option value="NEEDS WASH">NEEDS WASH</option>
                  <option value="Wash In Progress">Wash In Progress</option>
                  <option value="WASH COMPLETE">WASH COMPLETE</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedId(selectedId === car.id ? null : car.id)
                }
                className="px-2 py-1.5 text-left font-mono text-[13px] font-bold text-[#1a1a1a]"
              >
                {car.tag}
              </button>

              <div className="flex flex-wrap items-center gap-1 px-1.5 py-1.5">
                {car.labels.map((l) => (
                  <span
                    key={l}
                    className="rounded bg-[#c0392b] px-1.5 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap"
                  >
                    {l}
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedId(selectedId === car.id ? null : car.id)
                  }
                  className="flex h-5 w-5 items-center justify-center rounded border border-[#999] bg-white/80 text-[12px] text-[#555] hover:bg-white"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 inset-x-0 border-t border-[#c0c4ca] bg-[#eef1f5] px-3 py-1.5 text-center text-[10px] text-[#6b7280]">
        Jaguar Land Rover Carlsbad · Inspect
      </footer>
    </div>
  );
}
