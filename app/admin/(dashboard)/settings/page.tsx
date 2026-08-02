import { Suspense } from "react";
import { getSiteSettings } from "@/lib/queries/site-settings";
import SettingsForm from "./SettingsForm";
import SavedToast from "../_shared/SavedToast";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-2xl">
      <SettingsForm settings={settings} />
      <Suspense fallback={null}>
        <SavedToast />
      </Suspense>
    </div>
  );
}
