import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import { db } from "../../firebase.ts";

enum Type {
  Hike,
  Social,
}

interface Activity {
  title: string;
  date: Date;
  type: Type;
  misc: string;
}

interface CalendarProps {
  activities: Activity[];
}

function colourActivity(type: Type): string {
  switch (type) {
    case Type.Hike:
      return 'bg-green-200';
    case Type.Social:
      return 'bg-orange-200';
  }
}

const isSameWeek = (date1: Date, date2: Date) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = oneDay * 7;
  const diff = Math.abs(date1.getTime() - date2.getTime());
  if (diff >= oneWeek) return false; // More than 7 days apart
  let day1 = date1.getDay();
  let day2 = date2.getDay();
  if (day1 === 0) day1 = 7;
  if (day2 === 0) day2 = 7;
  return Math.ceil((date1.getTime() - (day1 - 1) * oneDay) / oneWeek)
    === Math.ceil((date2.getTime() - (day2 - 1) * oneDay) / oneWeek);
}

function Calendar({ activities }: CalendarProps) {
  const weeks: Activity[][] = [];
  let currentWeek: Activity[] = [];
  activities.forEach((activity) => {
    if (currentWeek.length === 0 || isSameWeek(currentWeek[currentWeek.length - 1].date, activity.date)
    ) {
      currentWeek.push(activity);
    } else {
      weeks.push(currentWeek);
      currentWeek = [activity];
    }
  })
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }
  console.log(weeks);
  return (
    <div className={"container mx-auto py-8"}>
      <h1 className={"text-2xl font-bold mb-4"}>Upcoming Activities</h1>
      <div className={"flex flex-col"}>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className={"flex flex-row gap-4"}>
            {week.map((act, actIndex) => (
              <div key={actIndex} className={colourActivity(act.type).concat(" shadow-md p-4")}>
                <h2 className={"text-lg font-semibold"}>{act.title}</h2>
                <h3 className={"text-gray-700"}>{act.date.toDateString()}</h3>
                <p className={"text-gray-500"}>{act.misc}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

async function retrieveActivitiesData() {
  const querySnapshot = await getDocs(collection(db, "activities"));
  const activities: Activity[] = [];
  querySnapshot.forEach((activity) => {
    const act = activity.data();
    act.date = act.date.toDate();
    activities.push(act as Activity)
  })
  return activities;
}

export default function ActivitiesPage() {
  const [activityData, setActivityData] = useState<Activity[]>([]);
  
  useEffect(() => {
    retrieveActivitiesData()
      .then((activities) => {
        activities.sort((a, b) => a.date.getTime() - b.date.getTime());
        setActivityData(activities);
    })
    .catch((error) => {
      console.error(error);
    })
  }, [activityData]);
  return (
    <>
      <PageHeader />
      <Calendar activities={activityData} />
      <PageFooter />
    </>
  )
}