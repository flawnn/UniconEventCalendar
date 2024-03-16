import { CalendarEvent } from "@/lib/types/event";
import { calculateSlotHeight } from "@/lib/utils";

interface CalendarEventTileProps {
  event: CalendarEvent;
  className?: string; // Add this line
}

export function CalendarEventTile({
  event,
  className,
}: CalendarEventTileProps) {
  const { title, color, subTitle, start, end } = event;

  return (
    <div
      style={{
        height: calculateSlotHeight(end, start),
      }}
      className={`flex justify-between ${className} my-[2px]	`}
    >
      {" "}
      {/* Use className here */}
      <div className={`${color} px-4 py-2 rounded-md`}>
        <p className="text-xs text-gray-500">9:00 - 10:00</p>
        <p className="font-semibold">{title}</p>
        <p className="text-sm">{subTitle}</p>
      </div>
    </div>
  );
}
