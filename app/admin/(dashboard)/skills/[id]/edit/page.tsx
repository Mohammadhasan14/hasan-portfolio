import { notFound } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/service";
import SkillGroupForm from "../../SkillGroupForm";
import { updateSkillGroup } from "../../actions";

export default async function EditSkillGroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data: group } = await supabase.from("skill_groups").select("*").eq("id", id).maybeSingle();

  if (!group) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-lg font-semibold text-neutral-100">Edit Skill Group</h1>
      <div className="mt-6">
        <SkillGroupForm group={group} action={updateSkillGroup.bind(null, id)} />
      </div>
    </div>
  );
}
