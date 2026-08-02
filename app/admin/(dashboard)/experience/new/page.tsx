import ExperienceForm from "../ExperienceForm";
import { createExperience } from "../actions";

export default function NewExperiencePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-lg font-semibold text-neutral-100">New Experience Entry</h1>
      <div className="mt-6">
        <ExperienceForm action={createExperience} />
      </div>
    </div>
  );
}
