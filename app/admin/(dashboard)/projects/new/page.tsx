import ProjectForm from "../ProjectForm";
import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <ProjectForm action={createProject} />
    </div>
  );
}
