import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import Calendar from "../components/Calendar";
import { setCollectionState, Doc } from "../../firebaseAPI"
import Activity from "../types/Activity.ts";


export default function UpcomingPage() {
  const [activityDocs, setActivityDocs] = useState<Doc<Activity>[]>([]);
  
  useEffect(() => {
    setCollectionState<Activity>(
      "activities", 
      (a, b) => a.date.getTime() - b.date.getTime(), 
      setActivityDocs, 
      (a) => {a.date = new Date(a.date); return a},
      (a) => {a.date = a.date.toDate(); return a as Activity}
      );
  }, []);
  return (
    <>
      <PageHeader />
      <Calendar activities={activityDocs} />
      <PageFooter />
    </>
  )
}