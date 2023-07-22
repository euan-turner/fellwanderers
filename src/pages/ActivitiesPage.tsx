import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import { db } from "../../firebase.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

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
  const [monthStart, setMonthStart] = useState<Date>(new Date(2023, 5, 1));
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);
  const earliest = new Date(2023, 4, 1);
  const latest = new Date(2023, 7, 1);
  const nextMonth = () => {
    setMonthStart(new Date(monthStart.setMonth(monthStart.getMonth() + 1)));
    setNextDisabled(monthStart.getTime() >= latest.getTime());
    setPrevDisabled(false);
  }
  const prevMonth = () => {
    setMonthStart(new Date(monthStart.setMonth(monthStart.getMonth() - 1)));
    setPrevDisabled(monthStart.getTime() <= earliest.getTime());
    setNextDisabled(false);
  }
  const dateFormat: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long'};
  const monthActivities = createMonthActivities(monthStart, activities);
  return (
    <div className={"container mx-auto py-8"}>
      <div className={"flex justify-center items-center mb-4"}>
        <button className={"bg-white hover:scale-y-110 py-2 px-4 rounded-lg"} onClick={prevMonth} disabled={prevDisabled}>
          {!prevDisabled && (
            <FontAwesomeIcon icon={faChevronLeft} />
          )}
        </button>
        <h1 className={"text-2xl font-bold"}>
          {monthStart.toLocaleDateString('default', dateFormat)}
        </h1>
        
        <button className={"bg-white hover:scale-y-110 font-bold py-2 px-4 rounded-lg"} onClick={nextMonth} disabled={nextDisabled}>
          {!nextDisabled && (
            <FontAwesomeIcon icon={faChevronRight} />
          )}
        </button>
        
      </div>

      <div className={"grid grid-rows-5 grid-cols-7 gap-4 max-h-screen"}>
        {monthActivities.map((act, actIndex) => (
          <div key={actIndex} className={colourActivity(act.type).concat(" shadow-md p-4 h-32")}>
            <h3 className={"text-gray-700"}>{act.date.toDateString()}</h3>
            <h2 className={"text-lg font-semibold"}>{act.title}</h2>
            <p className={"text-gray-500"}>{act.misc}</p>
          </div>
          )
        )}
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