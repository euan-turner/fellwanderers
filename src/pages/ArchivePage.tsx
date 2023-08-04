import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";

import HikeArchive from "../components/HikeArchive.tsx";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import Archive from "../types/Archive.ts";
import { setCollectionState, Doc } from "../../firebaseAPI";
import { useAuth } from "../contexts/AuthContext.tsx";
import { AddArchiveForm } from "../components/ArchiveForms.tsx";

interface CommitteeUpdatesProps {
  archiveDocs: Doc<Archive>[];
  setArchiveDocs: React.Dispatch<React.SetStateAction<Doc<Archive>[]>>;
}

function ArchiveCommitteeUpdates({ archiveDocs, setArchiveDocs }: CommitteeUpdatesProps) {
  const baseTabStyle = "w-full rounded-md px-1 sm:px-2.5 py-2 lg:py-2.5 text-sm leading-5 text-black font-semibold " +
  "ring-white ring-opacity-60 ring-offset-2 ring-offset-logoGreen-light " +
  "focus:outline-none focus:ring-2 ";
  // const [idsToDelete, setIdsToDelete] = useState<(string | null)[]>([]);
  return (
    <div>
      <Tab.Group>
      <Tab.List
              className={
                "max-h-12 flex lg:inline-flex w-full lg:min-w-max justify-around lg:justify-center items-center rounded-xl bg-logoGreen-light border-logoGreen-dark border py-2 px-1 lg:space-x-2"
              }
            >
          <Tab
                    className={({ selected }) =>
                      baseTabStyle.concat(
                        selected ? "bg-white shadow" : "hover:bg-white/20",
                      )
                    }
                  >Add Archive</Tab>
          <Tab
                    className={({ selected }) =>
                      baseTabStyle.concat(
                        selected ? "bg-white shadow" : "hover:bg-white/20",
                      )
                    }
                  >Edit Archive</Tab>
          <Tab
                    className={({ selected }) =>
                      baseTabStyle.concat(
                        selected ? "bg-white shadow" : "hover:bg-white/20",
                      )
                    }
                  >Delete Archive</Tab>
      </Tab.List> 
      <Tab.Panel>
        <AddArchiveForm 
          onSubmit={(archive, archiveDocs, setArchiveDocs) => (console.log(archive))}
          isValidAdd={() => {return [true, null]}}
          archiveDocs={archiveDocs}
          setState={setArchiveDocs}
        />
      </Tab.Panel>
      <Tab.Panel>
        <p>Edit Archive</p>
      </Tab.Panel>
      <Tab.Panel>
        <p>Delete Archive</p>
      </Tab.Panel>
      </Tab.Group>
    </div>
  )

}
export default function ArchivePage() {
  const [archiveDocs, setArchiveDocs] = useState<Doc<Archive>[]>([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    setCollectionState<Archive>(
      "archive", 
      (a, b) => a.order - b.order, 
      setArchiveDocs, 
      (a) => a,
      (a) => a as Archive
      )
  }, []);
  return (
    <>
      <PageHeader />
      <div className={"flex flex-col"}>
        <div className={"px-4 lg:px-10 pt-5"}>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trip Archive
          </h2>
          <p className="mt-3 text-lg leading-8 text-gray-600">
            Looking for some hiking inspiration? Here's a selection of some of
            the hikes we've been on in the past
          </p>
        </div>
        {
          isLoggedIn && 
          <div className={"px-4 lg:px-10 pt-5"}>
            <ArchiveCommitteeUpdates 
              archiveDocs={archiveDocs}
              setArchiveDocs={setArchiveDocs}
            />
          </div>
        }
        {archiveDocs.map(({data}) => (
          <div key={data.title}>
            <HikeArchive
              title={data.title}
              desc={data.desc}
              directory={data.directory}
              order={data.order}
            />
          </div>
        ))}
      </div>
      <PageFooter />
    </>
  );
}
