import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import HikeArchive from "../components/HikeArchive.tsx";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import { db } from "../../firebase.ts";
import Hike from "../types/Hike.ts";

async function retrieveArchiveData() {
  const querySnapshot = await getDocs(collection(db, "archive"));
  const hikes: Hike[] = [];
  querySnapshot.forEach((hike) => {
    hikes.push(hike.data() as Hike);
  });
  return hikes;
}

export default function ArchivePage() {
  const [hikeData, setHikeData] = useState<Hike[]>([]);

  useEffect(() => {
    const getCachedHikes = () => {
      const cachedHikes = localStorage.getItem("archive");
      if (cachedHikes) {
        return JSON.parse(cachedHikes);
      }
      return null;
    };
    const fetchHikesAndCache = async () => {
      retrieveArchiveData()
        .then((hikes) => {
          setHikeData(hikes);
          localStorage.setItem("archive", JSON.stringify(hikes));
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const cachedHikes = getCachedHikes();
    if (cachedHikes) {
      setHikeData(cachedHikes);
    } else {
      fetchHikesAndCache().catch((error) => {
        console.error("Error fetching archive: ", error);
      });
    }
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
