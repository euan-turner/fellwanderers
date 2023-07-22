import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import { db } from "../../firebase.ts";

enum Type {
  Hike,
  Social,
  Blank,
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
    case Type.Blank:
      return 'bg-white';
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

const groupActivities = (activities: Activity[]) => {
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
  return weeks;
}

const firstMondayOfMonth = (date: Date) => {
  const tempDate = new Date(date);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  tempDate.setDate(diff);
  return tempDate;
}

const lastSundayOfMonth = (date: Date) => {
  const tempDate = new Date(date);
  tempDate.setDate(1);
  tempDate.setMonth(date.getMonth() + 1);
  while (tempDate.getDay() !== 0) {
    tempDate.setDate(tempDate.getDate() + 1);
  }
  return tempDate;
}

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
    if ((monthActivities.length > 0) && (currDate.toString() === monthActivities[0].date.toString())) {
      activities.push(monthActivities.shift() as Activity);
    } else {
      activities.push({
        title: "",
        date: new Date(currDate),
        type: Type.Blank,
        misc: "",
      });
    }
    currDate.setDate(currDate.getDate() + 1);
  }
  return activities;
}

function Calendar({ activities }: CalendarProps) {
  const blankActivities = createMonthActivities(new Date(2023, 5, 1), activities);
  // Add activities into blankActivities
  const weeks = groupActivities(blankActivities);
  return (
    <div className={"container mx-auto py-8"}>
      <h1 className={"text-2xl font-bold mb-4"}>Upcoming Activities</h1>
      <div className={"grid grid-rows-5 gap-4"}>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className={"grid grid-cols-7 gap-4"}>
            {week.map((act, actIndex) => (
              <div key={actIndex} className={colourActivity(act.type).concat(" shadow-md p-4")}>
                <h3 className={"text-gray-700"}>{act.date.toDateString()}</h3>
                <h2 className={"text-lg font-semibold"}>{act.title}</h2>
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
  console.log("Retrieving activities");
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
    const getCachedActivities = () => {
      const cachedActivities = localStorage.getItem("activities");
      if (cachedActivities) {
        const activities = JSON.parse(cachedActivities);
        activities.forEach((activity: Activity) => {
          activity.date = new Date(activity.date);
        });
        return activities;
      }
      return null;
    };
    const fetchActivitiesAndCache = async () => {
      retrieveActivitiesData()
        .then((activities) => {
          activities.sort((a, b) => a.date.getTime() - b.date.getTime());
          setActivityData(activities);
          localStorage.setItem("activities", JSON.stringify(activities));
        })
        .catch((error) => {
          console.error(error);
        })
    }
    
    const cachedActivities = getCachedActivities();
    if (cachedActivities) {
      setActivityData(cachedActivities);
    } else {
      fetchActivitiesAndCache()
        .catch((error) => {
          console.error("Error fetching activities: ", error);
        });
    }
  }, []);
  return (
    <>
      <PageHeader />
      <Calendar activities={activityData} />
      <PageFooter />
    </>
  )
}