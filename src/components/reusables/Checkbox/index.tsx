import { ChangeEvent, InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Checkbox({ checked, onChange, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(e)}
      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      {...props}
    />
  );
}
