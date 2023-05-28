import { NavLink, useLocation } from "react-router-dom"
import { Tab } from "@headlessui/react"
import { useState } from "react"

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
  // Feels hacky - check with James
  // Better to structure app with header, then page below?
  // Or do this
  // Or use redux to have state outside of component?
  const location = useLocation();
  const initialState = links.filter((link) => link.link === location.pathname)[0].id;
  const [selectedIndex, setSelectedIndex] = useState(initialState);
  return (
    <div className={"flex w-screen justify-center px-2 py-4 sm:px-0"}>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        {/*TODO: First click does the routing, second click changes tab (once new page has been reached)
        I believe this is because header is within each page, so the state 'resets' for each new page
        */}
        <Tab.List className={"w-1/2 flex justify-evenly rounded-xl bg-blue-900/20 p-1"}>
          {links.map((link) => (
            <NavLink to={link.link} className={"w-full"}>
              <Tab
                key={link.id}
                className={({ selected } ) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >{link.text}
              </Tab>
            </NavLink>
          ))
          }
        </Tab.List>
      </Tab.Group>
    </div>
  )
}
