
export enum ActivityType {
  Hike,
  Social,
  Blank,
}

export default interface Activity {
  title: string;
  date: Date;
  type: ActivityType;
  misc: string;
}