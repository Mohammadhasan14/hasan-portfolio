import SkillGroupForm from "../SkillGroupForm";
import { createSkillGroup } from "../actions";

export default function NewSkillGroupPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-lg font-semibold text-neutral-100">New Skill Group</h1>
      <div className="mt-6">
        <SkillGroupForm action={createSkillGroup} />
      </div>
    </div>
  );
}
