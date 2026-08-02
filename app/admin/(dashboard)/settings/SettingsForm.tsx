"use client";

import { useActionState } from "react";
import { updateSiteSettings, type SettingsState } from "./actions";
import type { SiteSettingsRow } from "@/lib/supabase/types";
import Field from "../_shared/Field";
import { labelClass, fileInputClass, primaryButtonClass } from "../_shared/styles";

const initialState: SettingsState = { error: null, success: false };

export default function SettingsForm({ settings }: { settings: SiteSettingsRow | null }) {
  const [state, formAction, isPending] = useActionState(updateSiteSettings, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="profile_image" className={labelClass}>
          Profile photo (PNG/JPEG/WebP, up to 5MB)
        </label>
        {settings?.profile_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={settings.profile_image_url}
            alt=""
            className="h-20 w-20 rounded-full border border-neutral-800 object-cover"
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

      <button type="submit" disabled={isPending} className={primaryButtonClass}>
        {isPending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
