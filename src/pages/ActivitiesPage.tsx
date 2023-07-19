import { doc, setDoc } from "firebase/firestore";
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

const activities = [
  { title: 'Afternoon Tea @ SK', date: new Date(2023, 5, 26), type: Type.Social, misc: 'Meet on Queen\'s Lawn' },
  { title: 'Afternoon Tea @ SK', date: new Date(2023, 6, 2), type: Type.Social, misc: 'Meet on Queen\'s Lawn' },
  { title: 'Afternoon Tea @ SK', date: new Date(2023, 6, 9), type: Type.Social, misc: 'Meet on Queen\'s Lawn' },
  { title: 'Afternoon Tea @ SK', date: new Date(2023, 6, 16), type: Type.Social, misc: 'Meet on Queen\'s Lawn' },
  { title: 'Union Bar Night', date: new Date(2023, 5, 1), type: Type.Social, misc: 'Union Quiz Night' },
  { title: 'Picnic', date: new Date(2023, 5, 25), type: Type.Social, misc: 'Location TBC' },
  { title: 'High Wycombe to Oxford', date: new Date(2023, 5, 27), type: Type.Hike, misc: '50km' },
  { title: 'Epping Forest', date: new Date(2023, 6, 3), type: Type.Hike, misc: 'Mindfulness Society Collab' },
  { title: 'Lewes', date: new Date(2023, 6, 10), type: Type.Hike, misc: 'Shorter Day Hike' },
  { title: 'Chiltern Hills', date: new Date(2023, 6, 25), type: Type.Hike, misc: 'Shorter Day Hike'},
];

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
            <h3 className={"text-gray-700"}>{activity.date.toString()}</h3>
            <p className={"text-gray-500"}>{activity.misc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

async function setActivitiesData() {
  for (const activity of activities) {
    await setDoc(doc(db, "activities", String(activity.date)), {
      title: activity.title,
      date: activity.date,
      misc: activity.misc,
      type: activity.type,
    });
  }
}

export default function ActivitiesPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setActivitiesData()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error setting activities data:", error);
      });
  }, []);
  return (
    <>
      <PageHeader />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Calendar activities={activities} />
          <PageFooter />
        </>
      )}
    </>
  )
}