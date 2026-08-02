import StatForm from "../StatForm";
import { createStat } from "../actions";

export default function NewStatPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-lg font-semibold text-neutral-100">New Stat</h1>
      <div className="mt-6">
        <StatForm action={createStat} />
      </div>
    </div>
  );
}
