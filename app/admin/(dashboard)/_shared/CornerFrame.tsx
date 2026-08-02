export default function CornerFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <span className="pointer-events-none absolute -top-px -left-px h-4 w-4 border-t-[1.5px] border-l-[1.5px] border-admin-accent" />
      <span className="pointer-events-none absolute -top-px -right-px h-4 w-4 border-t-[1.5px] border-r-[1.5px] border-admin-accent" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b-[1.5px] border-l-[1.5px] border-admin-accent" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b-[1.5px] border-r-[1.5px] border-admin-accent" />
      {children}
    </div>
  );
}
