import { notFound } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/service";
import ProjectForm from "../../ProjectForm";
import { updateProject } from "../../actions";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data: project } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();

  if (!project) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <ProjectForm project={project} action={updateProject.bind(null, id)} />
    </div>
  );
}
