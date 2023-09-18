import {useState} from 'react';
import Activity, {ActivityType} from "../types/Activity";
import {Doc} from "../../firebaseAPI";

interface AddActivityPopupProps {
  doc: Doc<Activity>;
  onSubmit: (doc: Doc<Activity>) => void;
  onClose: () => void;
}
export default function AddActivityPopup({ doc, onSubmit, onClose }: AddActivityPopupProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [misc, setMisc] = useState('');
  const [error, setError] = useState<string | null>(null);
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  }
  const convertType = (text: string) => {
    if (text === "Hike") {
      return ActivityType.Hike;
    } else if (text === "Social"){
      return ActivityType.Social;
    } else {
      return ActivityType.Weekend;
    }
  }
  const isValidActivity = (title: string, type: string): [boolean, string | null] => {
    if (title.trim() === '') {
      return [false, "Title cannot be empty"];
    }
    if (type !== "Hike" && type !== "Social" && type !== "Weekend") {
      return [false, "Must select type"];
    }
    return [true, null];
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [isValid, err] = isValidActivity(title, type);
    setError(err);
    if (isValid) {
      doc.data = {
        title, date: doc.data.date, type: convertType(type), misc
      };
      onSubmit(doc);
      onClose();
    }
  }
  const tileDateFormat = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short" });
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
      <div className="bg-white w-1/3 p-4 shadow-md rounded">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">{tileDateFormat.format(doc.data.date)} Add Activity</h2>
          {error && <div className={"text-red-500"}>{error}</div>}
          <div className={"mb-4"}>
            <label className={"block text-gray-700"}>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-400 rounded px-4 py-2 w-full"
              />
          </div>
          <div className={"mb-4"}>
            <label className={"block text-gray-700"}>Misc:</label>
            <input
              type="text"
              value={misc}
              onChange={(e) => setMisc(e.target.value)}
              className="border border-gray-400 rounded px-4 py-2 w-full"
              />
          </div>
          <div className={"mb-4"}>
            <label htmlFor={"dropdown"} className={"block text-gray-700"}>Type:</label>
            <select id={"dropdown"} value={type || ''} onChange={handleTypeChange}>
              <option value=""> --Select-- </option>
              <option value="Hike"> Hike </option>
              <option value="Social"> Social </option>
              <option value="Weekend"> Weekend </option>
            </select>
          </div>
          <button className="px-2 mt-4 text-sm text-gray-500" type={"submit"}>Submit</button>
          <button
          className="px-2 mt-4 text-sm text-gray-500"
          onClick={onClose}
        >
          Close
        </button>
        </form>
        
      </div>
    </div>
  )
}