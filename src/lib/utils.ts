import { type ClassValue, clsx } from "clsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = (length: number) => {
  let result = "";
  const numbers = "0123456789";
  const numbersLength = numbers.length;

  for (let i = 0; i < length; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbersLength));
  }

  return Number(result);
};
