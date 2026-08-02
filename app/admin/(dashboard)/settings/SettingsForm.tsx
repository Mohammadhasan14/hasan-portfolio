"use client";

import { useActionState, useState } from "react";
import { updateSiteSettings, type SettingsState } from "./actions";
import type { SiteSettingsRow } from "@/lib/supabase/types";
import Field from "../_shared/Field";
import TagInput from "../_shared/TagInput";
import { labelClass, fileInputClass, primaryButtonClass } from "../_shared/styles";

const initialState: SettingsState = { error: null };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-admin-mono text-[10px] uppercase tracking-[0.18em] text-admin-accent">
      {"// "}
      {children}
    </div>
  );
}

export default function SettingsForm({ settings }: { settings: SiteSettingsRow | null }) {
  const [state, formAction, isPending] = useActionState(updateSiteSettings, initialState);
  const [isDirty, setIsDirty] = useState(false);

  return (
    <form action={formAction} onChange={() => setIsDirty(true)} className="flex flex-col gap-5">
      <div>
        <p className="font-admin-display text-[22px] font-semibold text-admin-text">Site settings</p>
        {isDirty && <p className="mt-0.5 font-admin-mono text-[11px] text-admin-faint">unsaved changes</p>}
      </div>

      <SectionLabel>Identity</SectionLabel>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="profile_image" className={labelClass}>
          Profile photo (PNG/JPEG/WebP, up to 5MB)
        </label>
        <div className="flex items-center gap-3.5">
          {settings?.profile_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={settings.profile_image_url}
              alt=""
              className="h-16 w-16 shrink-0 rounded-lg border border-admin-border object-cover"
            />
          )}
          <input
            id="profile_image"
            name="profile_image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className={fileInputClass}
          />
        </div>
      </div>

      <div className="border-t border-admin-border pt-5">
        <SectionLabel>Hero &amp; About</SectionLabel>
      </div>
      <Field label="Hero lead paragraph" name="hero_lead" defaultValue={settings?.hero_lead} textarea />
      <Field label="About bio" name="about_bio" defaultValue={settings?.about_bio} textarea />
      <Field
        label="About education line"
        name="about_education"
        defaultValue={settings?.about_education}
        textarea
      />
      <TagInput
        label="Available for"
        name="available_for"
        defaultValue={settings?.available_for?.join(", ")}
      />

      <div className="border-t border-admin-border pt-5">
        <SectionLabel>Contact</SectionLabel>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone" name="phone" defaultValue={settings?.phone} />
        <Field label="Location" name="location" defaultValue={settings?.location} />
      </div>
      <Field label="Contact email" name="contact_email" defaultValue={settings?.contact_email} type="email" />

      <div className="border-t border-admin-border pt-5">
        <SectionLabel>Social</SectionLabel>
      </div>
      <Field label="GitHub URL" name="github_url" defaultValue={settings?.github_url} type="url" />
      <Field label="LinkedIn URL" name="linkedin_url" defaultValue={settings?.linkedin_url} type="url" />
      <Field label="Résumé (PDF URL)" name="resume_url" defaultValue={settings?.resume_url} />

      {state.error && <p className="text-sm text-admin-accent">{state.error}</p>}

      <div className="sticky bottom-0 -mx-4 mt-2 flex gap-2 border-t border-admin-border bg-admin-bg/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <button type="submit" disabled={isPending} className={`${primaryButtonClass} flex-1`}>
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
