import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  editing?: boolean;
}

export function Input({ className, editing, ...props }: InputProps) {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <input
      className={cn(
        [
          `border border-gray-300 px-3 py-2 rounded w-full focus:ring focus:ring-blue-300 ${
            darkMode
              ? darkMode && editing
                ? "text-black"
                : "text-[#ffffff]"
              : "text-[#1A202C]"
          }`,
        ],
        className
      )}
      {...props}
    />
  );
}
