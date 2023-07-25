import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Activity, { ActivityType } from "../types/Activity.ts";

interface CalendarProps {
  activities: Activity[];
}

function colourActivity(type: ActivityType): string {
  switch (type) {
    case ActivityType.Blank:
      return "bg-white";
    case ActivityType.Hike:
      return "bg-green-200";
    case ActivityType.Social:
      return "bg-orange-200";
  }
}

const firstMondayOfMonth = (date: Date) => {
  const tempDate = new Date(date);
  // Set tempDate to first of current month
  tempDate.setDate(1);
  // Move tempDate to previous Monday
  while (tempDate.getDay() !== 1) {
    tempDate.setDate(tempDate.getDate() - 1);
  }
  return tempDate;
};

const lastSundayOfMonth = (date: Date) => {
  const tempDate = new Date(date);
  // Set tempDate to last day of current month
  tempDate.setDate(1);
  tempDate.setMonth(date.getMonth() + 1);
  tempDate.setDate(tempDate.getDate() - 1);
  // Move tempDate to next Sunday
  while (tempDate.getDay() !== 0) {
    tempDate.setDate(tempDate.getDate() + 1);
  }
  return tempDate;
};

// PRE: planned activities are in chronological order
const createMonthActivities = (startDate: Date, planned: Activity[]) => {
  const currDate = firstMondayOfMonth(startDate);
  const endDate = lastSundayOfMonth(startDate);
  const monthActivities = planned.filter((activity) => {
    const actDate = activity.date;
    return actDate >= currDate && actDate <= endDate;
  });
  const activities: Activity[] = [];
  while (currDate.getTime() <= endDate.getTime()) {
    if (
      monthActivities.length > 0 &&
      currDate.toString() === monthActivities[0].date.toString()
    ) {
      activities.push(monthActivities.shift() as Activity);
    } else {
      activities.push({
        title: "",
        date: new Date(currDate),
        type: ActivityType.Blank,
        misc: "",
      });
    }
    currDate.setDate(currDate.getDate() + 1);
  }
  return activities;
};

const today = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

export default function Calendar({ activities }: CalendarProps) {
  const [monthStart, setMonthStart] = useState<Date>(today());
  const [monthActivities, setMonthActivities] = useState<Activity[]>([]);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);

  // TODO: Work out if limits necessary, and how dynamic they may need to be
  const earliest = new Date(2023, 4, 1);
  const latest = new Date(2023, 7, 1);
  const nextMonth = () => {
    setMonthStart(new Date(monthStart.setMonth(monthStart.getMonth() + 1)));
    setNextDisabled(monthStart.getTime() >= latest.getTime());
    setPrevDisabled(false);
  };
  const prevMonth = () => {
    setMonthStart(new Date(monthStart.setMonth(monthStart.getMonth() - 1)));
    setPrevDisabled(monthStart.getTime() <= earliest.getTime());
    setNextDisabled(false);
  };
  const dateFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };

  useEffect(() => {
    setMonthActivities(createMonthActivities(monthStart, activities));
  }, [monthStart, activities]);

  return (
    <div className={"container mx-auto py-8"}>
      <div className={"flex justify-center items-center mb-4"}>
        <button
          className={"bg-white hover:scale-y-110 py-2 px-4 rounded-lg"}
          onClick={prevMonth}
          disabled={prevDisabled}
        >
          {!prevDisabled && <FontAwesomeIcon icon={faChevronLeft} />}
        </button>
        <h1 className={"text-2xl font-bold"}>
          {monthStart.toLocaleDateString("default", dateFormat)}
        </h1>

        <button
          className={
            "bg-white hover:scale-y-110 font-bold py-2 px-4 rounded-lg"
          }
          onClick={nextMonth}
          disabled={nextDisabled}
        >
          {!nextDisabled && <FontAwesomeIcon icon={faChevronRight} />}
        </button>
      </div>

      <div className={"flex flex-col h-[725px] overflow-y-scroll"}>
        <div className={"grid grid-rows-5 grid-cols-7 gap-4 p-2"}>
          {monthActivities.map((act, actIndex) => (
            <div
              key={actIndex}
              className={colourActivity(act.type).concat(" shadow-md p-4 h-32 border border-slate-400")}
            >
              <h3 className={"text-gray-700"}>{act.date.toDateString()}</h3>
              <h2 className={"text-lg font-semibold"}>{act.title}</h2>
              <p className={"text-gray-500"}>{act.misc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
