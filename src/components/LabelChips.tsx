export function LabelChips({ labels }: { labels: string[] }) {
  if (!labels.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {labels.map((label) => (
        <span
          key={label}
          className="inline-flex items-center rounded-md bg-red-600/90 px-2 py-0.5 text-[11px] font-semibold text-white"
        >
          {label}
        </span>
      ))}
    </div>
  );
}
