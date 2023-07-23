import { LoremIpsum } from "lorem-ipsum";

import HikeArchive from "../components/HikeArchive";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const hikes = [
  {
    title: "Stonehenge 2022",
    desc: lorem.generateParagraphs(6),
    directory: "images/archive/stonehenge22",
    textLeft: true,
  },
  {
    title: "Yorkshire 2022",
    desc: lorem.generateParagraphs(6),
    directory: "images/archive/yorkshire22",
    textLeft: false,
  }
]

export default function ArchivePage() {
  return (
    <>
      <PageHeader />
      <div className={"flex flex-col-reverse"}>
        <div className={"order-last px-10 pt-5"}>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trip Archive
          </h2>
          <p className="mt-3 text-lg leading-8 text-gray-600">
            Looking for some hiking inspiration? Here's a selection of some of the hikes we've been on in the past
          </p>
        </div>
        {hikes.map((hike) => (
          <HikeArchive title={hike.title} desc={hike.desc} directory={hike.directory} textLeft={hike.textLeft} />
        ))}
      </div>
      <PageFooter />
    </>
  )
}