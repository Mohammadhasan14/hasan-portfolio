import ExperienceForm from "../ExperienceForm";
import { createExperience } from "../actions";

export default function NewExperiencePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <ExperienceForm action={createExperience} />
    </div>
  );
}
