import { inputClass, labelClass } from "./styles";

export default function Field({
  label,
  name,
  defaultValue,
  type = "text",
  textarea = false,
  select,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  type?: string;
  textarea?: boolean;
  select?: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      {select ? (
        <select id={name} name={name} defaultValue={defaultValue ?? select[0]?.value} className={inputClass}>
          {select.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue ?? ""}
          rows={3}
          required
          className={inputClass}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          required
          className={inputClass}
        />
      )}
    </div>
  );
}
