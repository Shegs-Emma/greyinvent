import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { ButtonHTMLAttributes } from "react";
import { useSelector } from "react-redux";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive" | "ghost";
  size?: string;
}

export function Button({
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const baseStyles =
    "px-4 py-2 rounded text-sm font-medium transition cursor-pointer";
  const variants = {
    default: `bg-blue-600 hover:bg-blue-700 ${
      darkMode ? "text-[#ffffff] hover:text-black" : "text-black"
    }`,
    outline: `border border-gray-300 text-gray-700 hover:bg-gray-100  ${
      darkMode ? "text-[#ffffff] hover:text-black" : "text-black"
    }`,
    destructive: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-gray-500 hover:bg-gray-100",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  );
}
