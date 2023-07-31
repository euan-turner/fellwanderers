import { useEffect, useState } from "react";

import HikeArchive from "../components/HikeArchive.tsx";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import Hike from "../types/Hike.ts";
import { setCollectionState, Doc } from "../../firebaseAPI";

export default function ArchivePage() {
  const [hikeDocs, setHikeDocs] = useState<Doc<Hike>[]>([]);

  useEffect(() => {
    setCollectionState<Hike>(
      "archive", 
      (a, b) => a.title.localeCompare(b.title), 
      setHikeDocs, 
      (a) => a,
      (a) => a as Hike
      )
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
        {hikeDocs.map(({data}) => (
          <div key={data.title}>
            <HikeArchive
              title={data.title}
              desc={data.desc}
              directory={data.directory}
              textLeft={data.textLeft}
            />
          </div>
        ))}
      </div>
      <PageFooter />
    </>
  );
}
