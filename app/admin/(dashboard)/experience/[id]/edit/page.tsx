import { notFound } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/service";
import ExperienceForm from "../../ExperienceForm";
import { updateExperience } from "../../actions";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data: experience } = await supabase.from("experiences").select("*").eq("id", id).maybeSingle();

  if (!experience) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-lg font-semibold text-neutral-100">Edit Experience Entry</h1>
      <div className="mt-6">
        <ExperienceForm experience={experience} action={updateExperience.bind(null, id)} />
      </div>
    </div>
  );
}
