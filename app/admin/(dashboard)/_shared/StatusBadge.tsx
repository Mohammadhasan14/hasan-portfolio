export default function StatusBadge({ status }: { status: string }) {
  const isPublished = status === "published";
  return (
    <span
      className={`rounded border font-admin-mono text-[9.5px] uppercase tracking-wider px-1.5 py-0.5 ${
        isPublished
          ? "border-admin-success/30 bg-admin-success/10 text-admin-success"
          : "border-admin-border bg-admin-faint/10 text-admin-muted"
      }`}
    >
      {status}
    </span>
  );
}
