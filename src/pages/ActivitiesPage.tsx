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

function Calendar({ activities }: CalendarProps) {
  return (
    <div className={"container mx-auto py-8"}>
      <h1 className={"text-2xl font-bold mb-4"}>Upcoming Activities</h1>
      <div className={"grid grid-cols-3 gap-4"}>
        {activities.map((activity) => (
          <div key={activity.date.toString()} className={colourActivity(activity.type).concat(" shadow-md p-4")}>
            <h2 className={"text-lg font-semibold"}>{activity.title}</h2>
            <h3 className={"text-gray-700"}>{activity.date.toDateString()}</h3>
            <p className={"text-gray-500"}>{activity.misc}</p>
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