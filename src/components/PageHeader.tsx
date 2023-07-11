import { NavLink, useLocation } from "react-router-dom"
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
  const location = useLocation();
  const page = links.filter((link) => link.link === location.pathname)[0].id;
  return (
    <div className={"flex w-screen justify-around items-center h-30 px-2 py-4 sm:px-0"}>
      <div className={"w-1/4"}>
        <NavLink to={"/"}>
          <img className={"px-5 h-24 object-center"} src={"templogo.png"} alt={"society logo"} />
        </NavLink>
      </div>
      <div className={"w-1/4"}>
        <h1 className={"mb-4 text-2xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl"}>
          Fellwanderers
        </h1>
      </div>
      <Tab.Group selectedIndex={page} >
        <Tab.List className={"max-h-12 w-1/4 flex justify-center items-center rounded-xl bg-green-900/20 p-1"}>
          {links.map((link) => (
            <NavLink to={link.link} className={"w-full"}>
              <Tab
                key={link.id}
                className={({ selected } ) =>
                  classNames(
                    'w-full rounded-md px-2.5 py-2.5 text-sm font-medium leading-5 text-green-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-600 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-green-600 hover:bg-white/[0.12] hover:text-green-800'
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
