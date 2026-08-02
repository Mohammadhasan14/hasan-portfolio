import SkillGroupForm from "../SkillGroupForm";
import { createSkillGroup } from "../actions";

export default function NewSkillGroupPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <SkillGroupForm action={createSkillGroup} />
    </div>
  );
}
