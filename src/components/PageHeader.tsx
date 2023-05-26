import { NavLink } from "react-router-dom"
import { Tab } from "@headlessui/react"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function PageHeader() {
  const links: {id: number, link: string, text: string } [] = [
    { "id": 0, "link": "/", "text": "Home"},
    { "id": 1, "link": "/activities", "text": "Upcoming"},
    { "id": 2, "link": "/committee", "text": "Committee"},
    { "id": 3, "link": "/archive", "text": "Archive"}
  ]
  return (
    <div className={"flex w-screen justify-center px-2 py-4 sm:px-0"}>
      <Tab.Group>
        {/*TODO: Fix highlighting of tabs - highlighted when clicked off of link https://stackoverflow.com/questions/75176094/how-to-use-headless-ui-tabs-with-react-router-6*/}
        <Tab.List className={"w-1/2 flex justify-evenly rounded-xl bg-blue-900/20 p-1"}>
          {links.map((link) => (
            <Tab
              key={link.id}
              className={({ selected } ) =>
                classNames(
                  'w-1/4 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              <NavLink to={link.link}>{link.text}</NavLink>
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  )
}
