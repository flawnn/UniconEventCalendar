import { EventCalendar } from "@/components/event-calendar/event-calendar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-24, my-10">
      <div className="relative flex place-items-center">
        <EventCalendar events={[]}></EventCalendar>
      </div>
    </main>
  );
}
