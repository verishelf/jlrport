"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ActiveTask } from "@/components/ActiveTask";
import { CarCard } from "@/components/CarCard";
import { Header } from "@/components/Header";
import { NotificationBanner } from "@/components/NotificationBanner";
import { Car, initialCars, PORTER_NAME, WashStatus } from "@/lib/mock-data";

type Tab = "active" | "needs" | "progress" | "complete";

const STATUS_ORDER: WashStatus[] = [
  "PRIORITY WASH",
  "NEEDS WASH",
  "Wash In Progress",
  "WASH COMPLETE",
];

export default function PorterDashboard() {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [activeId, setActiveId] = useState<string | null>(
    initialCars.find((c) => c.status === "PRIORITY WASH")?.id ?? null
  );
  const [isWorking, setIsWorking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [incomingCar, setIncomingCar] = useState<Car | null>(null);
  const [tab, setTab] = useState<Tab>("active");

  const activeCar = cars.find((c) => c.id === activeId) ?? null;

  const counts = useMemo(() => {
    return {
      needs: cars.filter(
        (c) => c.status === "NEEDS WASH" || c.status === "PRIORITY WASH"
      ).length,
      progress: cars.filter((c) => c.status === "Wash In Progress").length,
      complete: cars.filter((c) => c.status === "WASH COMPLETE").length,
    };
  }, [cars]);

  const filteredQueue = useMemo(() => {
    let list: Car[] = [];
    if (tab === "needs") {
      list = cars.filter(
        (c) => c.status === "NEEDS WASH" || c.status === "PRIORITY WASH"
      );
    } else if (tab === "progress") {
      list = cars.filter((c) => c.status === "Wash In Progress");
    } else if (tab === "complete") {
      list = cars.filter((c) => c.status === "WASH COMPLETE");
    }
    return list.sort(
      (a, b) =>
        STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
    );
  }, [cars, tab]);

  useEffect(() => {
    if (!isWorking) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [isWorking]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newCar: Car = {
        id: "demo-new",
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
        notes: "Walk-in customer waiting — priority detail",
        timeInQueue: "0 min",
        keyTag: "K-300",
        deliveryTime: "ASAP",
      };
      setCars((prev) => [newCar, ...prev]);
      setIncomingCar(newCar);
      setShowNotification(true);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = useCallback(() => {
    if (!activeId) return;
    setIsWorking(true);
    setElapsed(0);
    setCars((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              status: "Wash In Progress" as const,
              assignedTo: PORTER_NAME,
            }
          : c
      )
    );
  }, [activeId]);

  const handleComplete = useCallback(() => {
    if (!activeId) return;
    setCars((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, status: "WASH COMPLETE" as const, timeInQueue: "—" }
          : c
      )
    );
    setIsWorking(false);
    setElapsed(0);
    setActiveId(null);
    setTab("complete");
  }, [activeId]);

  const handleCantFind = useCallback(() => {
    alert("Issue reported to dispatcher. They will reassign or assist.");
  }, []);

  const acceptNotification = () => {
    if (!incomingCar) return;
    setActiveId(incomingCar.id);
    setCars((prev) =>
      prev.map((c) =>
        c.id === incomingCar.id ? { ...c, assignedTo: PORTER_NAME } : c
      )
    );
    setShowNotification(false);
    setIncomingCar(null);
    setIsWorking(false);
    setTab("active");
  };

  const dismissNotification = () => {
    setShowNotification(false);
  };

  const selectCar = (c: Car) => {
    if (
      c.status === "NEEDS WASH" ||
      c.status === "PRIORITY WASH" ||
      c.status === "Wash In Progress"
    ) {
      setActiveId(c.id);
      setIsWorking(c.status === "Wash In Progress");
      setTab("active");
    }
  };

  return (
    <div className="flex min-h-full flex-col">
      <Header />

      {showNotification && incomingCar && (
        <NotificationBanner
          car={incomingCar}
          onAccept={acceptNotification}
          onDismiss={dismissNotification}
        />
      )}

      <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-28 pt-3">
        <div className="mb-3 grid grid-cols-4 gap-1 rounded-xl border border-border bg-card p-1">
          {(
            [
              { id: "active", label: "Active" },
              { id: "needs", label: `Needs (${counts.needs})` },
              { id: "progress", label: `In Prog (${counts.progress})` },
              { id: "complete", label: `Done (${counts.complete})` },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-lg py-2 text-[11px] font-semibold transition-colors ${
                tab === t.id
                  ? "bg-accent text-black"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "active" && (
          <ActiveTask
            car={activeCar}
            onStart={handleStart}
            onComplete={handleComplete}
            onCantFind={handleCantFind}
            isWorking={isWorking}
            elapsed={elapsed}
          />
        )}

        {tab !== "active" && (
          <div className="space-y-2.5">
            {filteredQueue.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted text-sm">
                No vehicles in this status
              </div>
            ) : (
              filteredQueue.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  isActive={car.id === activeId}
                  onSelect={selectCar}
                />
              ))
            )}
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 inset-x-0 border-t border-border bg-background/95 px-4 py-2.5 text-center text-[11px] text-muted backdrop-blur">
        Jaguar Land Rover Carlsbad · Wash / Detail Queue
      </footer>
    </div>
  );
}
