import "server-only";
import { createServiceClient } from "@/lib/supabase/service";

const BUCKET = "media";
const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only PNG, JPEG, or WebP images are allowed.";
  }
  if (file.size > MAX_SIZE) {
    return "Image must be 5MB or smaller.";
  }
  return null;
}

function extensionFor(file: File) {
  switch (file.type) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return "jpg";
  }
}

/**
 * Uploads to a stable path per entity (`folder/id.ext`), so replacing an
 * image overwrites the same object rather than leaving the old one orphaned.
 * A `?v=` cache-buster is appended since the URL itself doesn't change on
 * replace and browsers/CDNs would otherwise keep serving the old image.
 */
export async function uploadImage(folder: string, id: string, file: File) {
  const supabase = createServiceClient();
  const path = `${folder}/${id}.${extensionFor(file)}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: true,
    contentType: file.type,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return `${data.publicUrl}?v=${Date.now()}`;
}
