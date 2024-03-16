export type CalendarEvent = {
  title: string;
  subTitle?: string;
  description?: string;
  location: string;

  start: Date;
  end: Date;
  
  color?: string;
};
