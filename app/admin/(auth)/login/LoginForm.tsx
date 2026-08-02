"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

const inputClass =
  "w-full rounded-md border border-admin-border bg-admin-field px-3 py-2.5 text-base text-admin-text outline-none transition focus:border-admin-accent focus:ring-4 focus:ring-admin-accent/15 sm:text-sm";
const labelClass = "font-admin-mono text-[10px] uppercase tracking-wider text-admin-muted";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={inputClass}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className={`${inputClass} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-admin-faint transition hover:text-admin-text"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      {state.error && (
        <p className="flex items-center gap-1.5 font-admin-mono text-[11px] text-admin-accent">
          <span>✕</span> {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="mt-2 cursor-pointer rounded-md bg-admin-accent px-4 py-2.5 text-sm font-semibold text-admin-bg transition hover:brightness-110 active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Signing in..." : "Log in"}
      </button>
    </form>
  );
}
