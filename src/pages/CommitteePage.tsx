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
              {lorem.generateParagraphs(1)}
            </p>
          </div>
          <ul role="list" className="grid gap-x-12 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => (
              <li key={person.name}>
                <div className="overflow-visible relative max-w-sm mx-auto bg-logoGreen-light border border-logoGreen-dark shadow-lg ring-1 ring-black/5 rounded-xl flex items-center gap-6">
                  <img className="absolute -left-6 w-24 h-24 border border-logoGreen-dark rounded-full shadow-lg"
                       src={person.image} alt={person.name}/>
                    <div className="flex flex-col py-5 pl-24">
                      <strong className="text-slate-900 text-sm font-medium">{person.name}</strong>
                      <span className="text-slate-500 text-sm font-medium">{person.role}</span>
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