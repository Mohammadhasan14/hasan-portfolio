import "server-only";
import { createHash } from "node:crypto";
import { createServiceClient } from "@/lib/supabase/service";

const MAX_SUBMISSIONS_PER_HOUR = 3;

export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

export async function isContactRateLimited(ipHash: string): Promise<boolean> {
  const supabase = createServiceClient();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const { count, error } = await supabase
    .from("contact_submissions")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", oneHourAgo);

  // Fail open: a broken count query shouldn't block a real visitor.
  if (error) return false;
  return (count ?? 0) >= MAX_SUBMISSIONS_PER_HOUR;
}
