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
    images: [
      "/hike_pics/stonehenge_22/a.jpg",
      "/hike_pics/stonehenge_22/b.jpg",
      "/hike_pics/stonehenge_22/c.jpg",
      "/hike_pics/stonehenge_22/d.jpg",
      "/hike_pics/stonehenge_22/e.jpg",
      "/hike_pics/stonehenge_22/f.jpg"
    ],
    textLeft: true,
  },
  {
    title: "Yorkshire 2022",
    desc: lorem.generateParagraphs(6),
    images: [
      "/hike_pics/yorkshire_22/b.jpg",
      "/hike_pics/yorkshire_22/c.jpg",
      "/hike_pics/yorkshire_22/a.jpg",
      "/hike_pics/yorkshire_22/d.jpg",
      "/hike_pics/yorkshire_22/e.jpg",
      "/hike_pics/yorkshire_22/f.jpg"
    ],
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
          <HikeArchive title={hike.title} desc={hike.desc} images={hike.images} textLeft={hike.textLeft} />
        ))}
      </div>
      <PageFooter />
    </>
  )
}