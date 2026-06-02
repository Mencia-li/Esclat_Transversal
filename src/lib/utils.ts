import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Une clases condicionales y resuelve conflictos de Tailwind, como p-2 + p-4.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
