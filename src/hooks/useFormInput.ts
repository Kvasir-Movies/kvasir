import { ChangeEvent, useState } from "react";

export default function useFormInput(
  initialValue: string
): {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} {
  const [value, setValue] = useState(initialValue);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange
  };
}
