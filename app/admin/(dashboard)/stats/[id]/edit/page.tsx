import { notFound } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/service";
import StatForm from "../../StatForm";
import { updateStat } from "../../actions";

export default async function EditStatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data: stat } = await supabase.from("stats").select("*").eq("id", id).maybeSingle();

  if (!stat) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <StatForm stat={stat} action={updateStat.bind(null, id)} />
    </div>
  );
}
