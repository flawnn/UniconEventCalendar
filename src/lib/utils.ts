import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const TIME_SLOT_DURATION = 30; // minutes

export const SLOT_TIME_HEIGHT = 60; // px

export const SLOT_TIME_PADDING = 6; // px

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateSlotHeight(timeDate: Date, startTimeDate: Date) {
  const slotDurationInMinutes = TIME_SLOT_DURATION;

  const diffInMilliseconds = timeDate.getTime() - startTimeDate.getTime();
  const diffInMinutes = diffInMilliseconds / (1000 * 60);

  const slotsSinceStart = diffInMinutes / slotDurationInMinutes;
  const slotHeight = slotsSinceStart * SLOT_TIME_HEIGHT; // Adjust based on desired slot height

  return slotHeight + slotsSinceStart * SLOT_TIME_PADDING;
}
