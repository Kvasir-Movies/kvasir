import { ChangeEvent, useState } from "react";

export default function useFormInput(
  initialValue: string
): {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
} {
  const [value, setValue] = useState(initialValue);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return {
    value,
    handleChange
  };
}
