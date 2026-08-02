import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="relative rounded-lg border border-admin-border bg-admin-surface p-7 shadow-2xl sm:p-8">
        <span className="pointer-events-none absolute -top-px -left-px h-4 w-4 border-t-[1.5px] border-l-[1.5px] border-admin-accent" />
        <span className="pointer-events-none absolute -top-px -right-px h-4 w-4 border-t-[1.5px] border-r-[1.5px] border-admin-accent" />
        <span className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b-[1.5px] border-l-[1.5px] border-admin-accent" />
        <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b-[1.5px] border-r-[1.5px] border-admin-accent" />

        <p className="font-admin-mono text-[19px] font-bold tracking-tight text-admin-text">
          MH<span className="text-admin-accent">://</span>dev
        </p>
        <p className="mt-1.5 font-admin-mono text-[11px] uppercase tracking-wider text-admin-faint">
          Admin console
        </p>
        <p className="mt-6 font-admin-mono text-xs text-admin-muted">
          <span className="text-admin-accent">&gt;_</span> auth{" "}
          <span className="text-admin-faint">— sign in to edit the site</span>
        </p>

        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
      <p className="mt-5 text-center font-admin-mono text-[10px] tracking-wider text-admin-faint">
        session · single user · no signups
      </p>
    </div>
  );
}
