"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SavedToast() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const saved = searchParams.get("saved");

  useEffect(() => {
    if (!saved) return;
    const timeout = setTimeout(() => {
      const url = new URL(window.location.href);
      url.searchParams.delete("saved");
      router.replace(url.pathname + url.search, { scroll: false });
    }, 3200);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saved]);

  if (!saved) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:right-6 sm:left-auto sm:w-80">
      <div className="flex items-center gap-3 rounded-md border-l-[3px] border-y border-r border-admin-success/35 border-l-admin-success bg-admin-surface px-3.5 py-3 shadow-2xl">
        <span className="h-2 w-2 shrink-0 rounded-full bg-admin-success" />
        <div className="min-w-0 flex-1">
          <p className="text-[13.5px] text-admin-text">Saved</p>
          <p className="truncate font-admin-mono text-[10.5px] text-admin-faint">{decodeURIComponent(saved)}</p>
        </div>
      </div>
    </div>
  );
}
