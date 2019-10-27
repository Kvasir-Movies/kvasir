import { ChangeEvent, useState } from "react";

export default function useFormInput(
  initialValue: string
): {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValue: (value: string) => void;
} {
  const [value, setValue] = useState(initialValue);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return {
    value,
    setValue,
    onChange
  };
}
