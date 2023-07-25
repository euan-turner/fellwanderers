import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import Calendar from "../components/Calendar";
import { db } from "../../firebase.ts";
import Activity from "../types/Activity.ts";


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

export default function UpcomingPage() {
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