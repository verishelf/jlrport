"use client";

import { useCallback, useEffect, useState } from "react";
import { ActiveTask } from "@/components/ActiveTask";
import { CarCard } from "@/components/CarCard";
import { Header } from "@/components/Header";
import { NotificationBanner } from "@/components/NotificationBanner";
import { Car, initialCars, PORTER_NAME } from "@/lib/mock-data";

export default function PorterDashboard() {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [activeId, setActiveId] = useState<string | null>(
    initialCars.find((c) => c.status === "assigned")?.id ?? null
  );
  const [isWorking, setIsWorking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [incomingCar, setIncomingCar] = useState<Car | null>(null);
  const [tab, setTab] = useState<"active" | "queue">("active");

  const activeCar = cars.find((c) => c.id === activeId) ?? null;
  const queue = cars.filter(
    (c) => c.status === "queued" || (c.status === "assigned" && c.id !== activeId)
  );

  useEffect(() => {
    if (!isWorking) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [isWorking]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newCar: Car = {
        id: "demo-new",
        stockNumber: "LR26099",
        year: 2026,
        make: "Land Rover",
        model: "Range Rover",
        trim: "SE",
        color: "Hakuba Silver",
        colorHex: "#c0c0c0",
        location: "Front Line 1",
        priority: "high",
        status: "queued",
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
        c.id === activeId ? { ...c, status: "in_progress" as const } : c
      )
    );
  }, [activeId]);

  const handleComplete = useCallback(() => {
    if (!activeId) return;
    setCars((prev) =>
      prev.map((c) =>
        c.id === activeId ? { ...c, status: "completed" as const } : c
      )
    );
    setIsWorking(false);
    setElapsed(0);
    setActiveId(null);
    setTab("queue");
  }, [activeId]);

  const handleCantFind = useCallback(() => {
    alert("Issue reported to dispatcher. They will reassign or assist.");
  }, []);

  const acceptNotification = () => {
    if (!incomingCar) return;
    setActiveId(incomingCar.id);
    setCars((prev) =>
      prev.map((c) =>
        c.id === incomingCar.id
          ? { ...c, status: "assigned" as const, assignedTo: PORTER_NAME }
          : c
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

      <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-24 pt-4">
        <div className="mb-4 flex rounded-2xl border border-border bg-card p-1">
          <button
            type="button"
            onClick={() => setTab("active")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors ${
              tab === "active"
                ? "bg-accent text-black"
                : "text-muted hover:text-foreground"
            }`}
          >
            Active Task
          </button>
          <button
            type="button"
            onClick={() => setTab("queue")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors ${
              tab === "queue"
                ? "bg-accent text-black"
                : "text-muted hover:text-foreground"
            }`}
          >
            Queue ({queue.length})
          </button>
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

        {tab === "queue" && (
          <div className="space-y-3">
            <p className="text-sm text-muted">
              Upcoming vehicles sorted by priority
            </p>
            {queue.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted">
                Queue is empty
              </div>
            ) : (
              queue.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  isActive={car.id === activeId}
                  onSelect={(c) => {
                    if (c.status === "queued") {
                      setActiveId(c.id);
                      setCars((prev) =>
                        prev.map((x) =>
                          x.id === c.id
                            ? {
                                ...x,
                                status: "assigned",
                                assignedTo: PORTER_NAME,
                              }
                            : x
                        )
                      );
                      setIsWorking(false);
                      setTab("active");
                    }
                  }}
                />
              ))
            )}
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 inset-x-0 border-t border-border bg-background/95 px-4 py-3 text-center text-xs text-muted backdrop-blur">
        Hoehn Jaguar Land Rover Carlsbad · Porter Live Queue
      </footer>
    </div>
  );
}
