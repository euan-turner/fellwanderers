import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

enum Type {
  Hike,
  Social,
}

interface Activity {
  id: number;
  title: string;
  date: string;
  type: Type;
  misc: string;
}

interface CalendarProps {
  activities: Activity[];
}

const activities = [
  { id: 1, title: 'Afternoon Tea @ SK', date: '26-05-2023', type: Type.Social, misc: 'Meet on Queen\'s Lawn' },
  { id: 2, title: 'Afternoon Tea @ SK', date: '02-06-2023', type: Type.Social, misc: 'Meet on Queen\'s Lawn' },
  { id: 3, title: 'Afternoon Tea @ SK', date: '09-05-2023', type: Type.Social, misc: 'Meet on Queen\'s Lawn' },
  { id: 4, title: 'Afternoon Tea @ SK', date: '16-05-2023', type: Type.Social, misc: 'Meet on Queen\'s Lawn' },
  { id: 5, title: 'Union Bar Night', date: '01-05-2023', type: Type.Social, misc: 'Union Quiz Night' },
  { id: 6, title: 'Picnic', date: '22-05-2023', type: Type.Social, misc: 'Location TBC' },
  { id: 7, title: 'High Wycombe to Oxford', date: '27-05-2023', type: Type.Hike, misc: '50km' },
  { id: 8, title: 'Epping Forest', date: '03-06-2023', type: Type.Hike, misc: 'Mindfulness Society Collab' },
  { id: 9, title: 'Lewes', date: '10-06-2023', type: Type.Hike, misc: 'Shorter Day Hike' },
  { id: 10, title: 'Chiltern Hills', date: '25-06-2023', type: Type.Hike, misc: 'Shorter Day Hike'},
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
          <div key={activity.id} className={colourActivity(activity.type).concat(" shadow-md p-4")}>
            <h2 className={"text-lg font-semibold"}>{activity.title}</h2>
            <h3 className={"text-gray-700"}>{activity.date}</h3>
            <p className={"text-gray-500"}>{activity.misc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ActivitiesPage() {
  return (
    <>
      <PageHeader />
      <Calendar activities={activities} />
      <PageFooter />
    </>
  )
}