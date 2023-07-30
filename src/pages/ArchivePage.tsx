import { useEffect, useState } from "react";

import HikeArchive from "../components/HikeArchive.tsx";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import Hike from "../types/Hike.ts";
import { setStateData } from "../../firebaseAPI";

export default function ArchivePage() {
  const [hikeData, setHikeData] = useState<Hike[]>([]);

  useEffect(() => {
    setStateData<Hike>("archive", (a, b) => a.title.localeCompare(b.title), setHikeData, (a) => a)
  }, []);
  return (
    <>
      <PageHeader />
      <div className={"flex flex-col-reverse"}>
        <div className={"order-last px-4 lg:px-10 pt-5"}>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trip Archive
          </h2>
          <p className="mt-3 text-lg leading-8 text-gray-600">
            Looking for some hiking inspiration? Here's a selection of some of
            the hikes we've been on in the past
          </p>
        </div>
        {hikeData.map((hike) => (
          <div key={hike.title}>
            <HikeArchive
              title={hike.title}
              desc={hike.desc}
              directory={hike.directory}
              textLeft={hike.textLeft}
            />
          </div>
        ))}
      </div>
      <PageFooter />
    </>
  );
}
