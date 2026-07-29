import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="w-full max-w-sm rounded-lg border border-neutral-800 bg-neutral-950 p-8 shadow-xl">
      <p className="mono text-xs uppercase tracking-widest text-neutral-500">Admin</p>
      <h1 className="mt-1 text-xl font-semibold text-neutral-100">Sign in</h1>
      <div className="mt-6">
        <LoginForm />
      </div>
    </div>
  );
}
