import BaseInput from "../input";
import Select from "../select";

const TYPES = {
  text: { type: "text" },
  date: { type: "date" },
} as const;

interface FieldProps {
  type: "date" | "text" | "dropdown";
  options: readonly string[];
  displayName: string;
}

export default function Field({ type, options, displayName }: FieldProps) {
  if (type === "dropdown") {
    return <Select options={options} label={displayName} />;
  }

  return <BaseInput {...TYPES[type]} />;
}
