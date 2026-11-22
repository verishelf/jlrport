import { WashStatus, statusColor } from "@/lib/mock-data";

export function StatusBadge({ status }: { status: WashStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${statusColor(status)}`}
    >
      {status}
    </span>
  );
}
