import {
  SLOT_TIME_HEIGHT,
  SLOT_TIME_PADDING,
  TIME_SLOT_DURATION,
  calculateSlotHeight,
} from "@/lib/utils";
import { CalendarEvent } from "../../lib/types/event"; // Assuming you have a type called CalendarEvent
import { CalendarEventTile } from "./calendar-tile";

interface EventCalendarProps {
  events: CalendarEvent[];
}

const START_TIME = new Date("2022-01-01T09:00:00");
const END_TIME = new Date("2022-01-01T20:30:00");
const BREAK_TIME = new Date("2022-01-01T14:30:00");

function renderTimeSlots(startTime: Date, endTime: Date) {
  const timeSlots = [];

  while (startTime.getTime() <= endTime.getTime()) {
    timeSlots.push(
      <div
        key={startTime.getTime()}
        style={{
          height: SLOT_TIME_HEIGHT,
          marginTop: SLOT_TIME_PADDING,
          marginBottom: SLOT_TIME_PADDING,
        }}
        // PADDING HIER U
        className="text-sm text-gray-500"
      >
        {formatTime(startTime)}
      </div>
    );

    startTime = new Date(startTime.getTime() + TIME_SLOT_DURATION * 60 * 1000);
  }

  return timeSlots;
}
/*
  So we need to preprocess the CalendarEvent data first
  For this we need to do the following:

  1) Find out how many locations we have - so we know how many columns to render
  2) We can find out the height depending on the slot pixel height how many pixels we need to offset it from above and how long we need to make it
  
  export function calculateSlotHeight(time, startTime) {
  const slotDurationInMinutes = moment.duration(TIME_SLOT_DURATION, 'minutes');
  const slotsSinceStart = moment(time).diff(moment(startTime), 'minutes') / slotDurationInMinutes;
  const slotHeight = slotsSinceStart * 10; // Adjust based on desired slot height

  return slotHeight;
}


*/
// So we need to
/*
  1) Calculate the displayed time in the event tiles correctly
  2) Implement a Stack so that we can show events that take on the full width between two rooms
  3) Description Hover (optional)
*/

export function EventCalendar(props: EventCalendarProps) {
  const { events } = props;

  let testEventArr: CalendarEvent[] = [
    // Cinema
    {
      title: "Breakfast",
      location: "Cinema",
      color: "bg-pink-300",
      start: new Date(2022, 0, 1, 9, 0, 0),
      end: new Date(2022, 0, 1, 10, 0, 0),
    },
    {
      title: "Live Podcast",
      location: "Cinema",
      subTitle: "Felix Haas & Patrick Haede",
      color: "bg-pink-300",
      start: new Date(2022, 0, 1, 10, 0, 0),
      end: new Date(2022, 0, 1, 10, 45, 0),
    },
    {
      title: "To be announced...",
      location: "Cinema",
      color: "bg-pink-300",
      start: new Date(2022, 0, 1, 10, 45, 0),
      end: new Date(2022, 0, 1, 11, 15, 0),
    },
    {
      title: "Speaker",
      location: "Cinema",
      subTitle: "Diana zur Löwen",
      color: "bg-pink-300",
      start: new Date(2022, 0, 1, 11, 15, 0),
      end: new Date(2022, 0, 1, 12, 0, 0),
    },
    {
      title: "Speaker",
      location: "Cinema",
      subTitle: "Judith Dada",
      color: "bg-pink-300",
      start: new Date(2022, 0, 1, 12, 0, 0),
      end: new Date(2022, 0, 1, 13, 0, 0),
    },
    {
      title: "AI/YC Panel",
      location: "Cinema",
      subTitle: "Lennard Schmidt, Clemens Rawert & Justus Mattern",
      color: "bg-pink-300",
      start: new Date(2022, 0, 1, 13, 0, 0),
      end: new Date(2022, 0, 1, 14, 0, 0),
    },
    {
      title: "Lunch",
      location: "Cinema",
      color: "bg-pink-300",
      start: new Date(2022, 0, 1, 14, 0, 0),
      end: new Date(2022, 0, 1, 14, 30, 0),
    },

    // // Scissors
    {
      title: "To be announced",
      location: "Scissors",
      color: "bg-pink-300",
      start: new Date(2022, 0, 1, 9, 0, 0),
      end: new Date(2022, 0, 1, 14, 30, 0),
    },
  ];

  /**
   * Represents the columns of the event calendar.
   * The first element is the number of columns.
   * The second element is an array of column names.
   */
  let columns = getColumns(testEventArr);

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-3xl font-bold text-gray-900">
        Friday, 15th of March 2024
      </h2>
      <div className="flex flex-col lg:flex-row items-stretch lg:gap-4">
        {/* Column 1 */}
        {buildCalendarColumn(testEventArr, columns, true)}
        {/* Column 2 */}
        {buildCalendarColumn(testEventArr, columns, true)}
      </div>
    </div>
  );
}

function buildCalendarColumn(
  eventArr: CalendarEvent[],
  columns: string[],
  isFirst: boolean = false
) {
  return (
    <div className={`flex flex-row gap-4`}>
      {columns.map((columnName: string, i: number) => {
        // IMPORTANT
        let first_half = isFirst;

        let events = eventArr
          .filter(
            (event) =>
              event.start.getTime() < BREAK_TIME.getTime() !==
              (first_half ? false : true)
          )
          .filter((event) => event.location == columnName);

        return (
          <div key={columnName} className="flex flex-col">
            {/* Title */}
            <button
              className={`px-4 py-2 bg-gray-200 rounded-md lg:visible ${
                isFirst ? "" : `invisible`
              }`}
            >
              {columnName}
            </button>
            <div className="flex flex-row items-stretch">
              {i == 0 && (
                <div className="flex-initial w-24 ">
                  {first_half
                    ? renderTimeSlots(
                        START_TIME,
                        new Date(BREAK_TIME.getTime() - 15 * 60 * 1000)
                      )
                    : renderTimeSlots(BREAK_TIME, END_TIME)}
                </div>
              )}
              {/* Event Tiles */}
              <div className="flex-1 mt-2">
                {" "}
                {events.map((realEvent, i) => {
                  return (
                    <CalendarEventTile
                      className={
                        `relative top-` +
                        calculateSlotHeight(realEvent.start, START_TIME)
                      }
                      event={realEvent}
                      key={i}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

function getColumns(events: CalendarEvent[]): string[] {
  let columns: string[] = [];

  for (let event of events) {
    if (columns.length == 0 || !columns.some((v) => v == event.location)) {
      columns.push(event.location);
    }
  }

  return columns;
}
