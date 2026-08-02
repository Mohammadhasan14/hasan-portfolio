export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${
        status === "published" ? "bg-emerald-500/15 text-emerald-400" : "bg-neutral-700/50 text-neutral-400"
      }`}
    >
      {status}
    </span>
  );
}
