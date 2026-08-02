import StatForm from "../StatForm";
import { createStat } from "../actions";

export default function NewStatPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <StatForm action={createStat} />
    </div>
  );
}
