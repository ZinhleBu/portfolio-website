/** @format */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import {
  Code,
  Monitor,
  Smartphone,
  Palette,
  Cloud,
  LucideIcon,
} from "lucide-react";

export type IconName =
  | "Software Development"
  | "Web Development"
  | "Mobile App Development"
  | "UI/UX Design"
  | "Cloud Computing";

export const iconMapping: Record<IconName, LucideIcon> = {
  "Software Development": Code,
  "Web Development": Monitor,
  "Mobile App Development": Smartphone,
  "UI/UX Design": Palette,
  "Cloud Computing": Cloud,
};
