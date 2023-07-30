import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import Calendar from "../components/Calendar";
import { setStateData } from "../../firebaseAPI"
import Activity from "../types/Activity.ts";


export default function UpcomingPage() {
  const [activityData, setActivityData] = useState<Activity[]>([]);
  
  useEffect(() => {
    setStateData<Activity>("activities", (a, b) => a.date.getTime() - b.date.getTime(), setActivityData, (a: Activity) => a.date = new Date(a.date));
  }, []);
  return (
    <>
      <PageHeader />
      <Calendar activities={activityData} />
      <PageFooter />
    </>
  )
}