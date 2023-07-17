import { LoremIpsum } from "lorem-ipsum";

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

const people = [
  {
    name: 'James King',
    role: 'President',
    image: 'person.png'
  },
  {
    name: 'Michael Sellgren',
    role: 'Deputy President',
    image: 'person.png'
  },
  {
    name: lorem.generateWords(2),
    role: lorem.generateWords(2),
    image: 'person.png'
  },
  {
    name: lorem.generateWords(2),
    role: lorem.generateWords(2),
    image: 'person.png'
  },
  {
    name: lorem.generateWords(2),
    role: lorem.generateWords(2),
    image: 'person.png'
  },
  {
    name: lorem.generateWords(2),
    role: lorem.generateWords(2),
    image: 'person.png'
  },
  {
    name: lorem.generateWords(2),
    role: lorem.generateWords(2),
    image: 'person.png'
  },
  {
    name: lorem.generateWords(2),
    role: lorem.generateWords(2),
    image: 'person.png'
  }
]

export default function CommitteePage() {
  return (
    <>
      <PageHeader />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet your committee</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {lorem.generateParagraphs(1)};
            </p>
          </div>
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img className="h-16 w-16 rounded-full" src={person.image} alt="" />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <PageFooter />
    </>
  )
}

// https://tailwindui.com/components/marketing/sections/team-sections