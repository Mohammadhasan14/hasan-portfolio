"use client";

import { useActionState } from "react";
import { updateSiteSettings, type SettingsState } from "./actions";
import type { SiteSettingsRow } from "@/lib/supabase/types";

const initialState: SettingsState = { error: null, success: false };

const inputClass =
  "w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-[#ff4d5a]";
const labelClass = "text-xs uppercase tracking-wide text-neutral-400";

export default function SettingsForm({ settings }: { settings: SiteSettingsRow | null }) {
  const [state, formAction, isPending] = useActionState(updateSiteSettings, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Field label="Hero lead paragraph" name="hero_lead" defaultValue={settings?.hero_lead} textarea />
      <Field label="About bio" name="about_bio" defaultValue={settings?.about_bio} textarea />
      <Field
        label="About education line"
        name="about_education"
        defaultValue={settings?.about_education}
        textarea
      />
      <Field
        label="Available for (comma-separated)"
        name="available_for"
        defaultValue={settings?.available_for?.join(", ")}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone" name="phone" defaultValue={settings?.phone} />
        <Field label="Location" name="location" defaultValue={settings?.location} />
      </div>
      <Field label="Contact email" name="contact_email" defaultValue={settings?.contact_email} type="email" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="GitHub URL" name="github_url" defaultValue={settings?.github_url} type="url" />
        <Field label="LinkedIn URL" name="linkedin_url" defaultValue={settings?.linkedin_url} type="url" />
      </div>
      <Field label="Resume URL" name="resume_url" defaultValue={settings?.resume_url} />

      {state.error && <p className="text-sm text-red-400">{state.error}</p>}
      {state.success && <p className="text-sm text-emerald-400">Saved.</p>}

      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-md bg-[#ff4d5a] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  textarea = false,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue ?? ""}
          rows={3}
          required
          className={inputClass}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          required
          className={inputClass}
        />
      )}
    </div>
  );
}
