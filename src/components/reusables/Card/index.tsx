import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  // style: CSSProperties;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      // style={style}
      className={cn("border rounded-lg shadow-sm p-4 bg-white", className)}
    >
      {children}
    </div>
  );
}
