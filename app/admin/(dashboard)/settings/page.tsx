import { getSiteSettings } from "@/lib/queries/site-settings";
import SettingsForm from "./SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-lg font-semibold text-neutral-100">Site Settings</h1>
      <p className="mt-1 text-sm text-neutral-400">
        Hero copy, about text, and contact details shown across the public site.
      </p>
      <div className="mt-6">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
