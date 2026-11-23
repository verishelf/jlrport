import { Priority } from "@/lib/mock-data";

const styles: Record<Priority, string> = {
  high: "bg-red-500/20 text-red-400 border-red-500/40",
  normal: "bg-amber-500/20 text-amber-400 border-amber-500/40",
  low: "bg-zinc-500/20 text-zinc-400 border-zinc-500/40",
};

export function PriorityBadge({ priority }: { priority?: Priority }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${styles[priority ?? "normal"]}`}
    >
      {priority ?? "normal"}
    </span>
  );
}
