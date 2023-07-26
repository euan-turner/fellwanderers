import { createBrowserRouter, RouterProvider } from "react-router-dom"
import UpcomingPage from "./pages/UpcomingPage.tsx"
import ArchivePage from "./pages/ArchivePage"
import CommitteePage from "./pages/CommitteePage"
import HomePage from "./pages/HomePage"
import FaqPage from "./pages/FaqPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/activities",
    element: <UpcomingPage />
  },
  {
    path: "/committee",
    element: <CommitteePage />
  },
  {
    path: "/archive",
    element: <ArchivePage />
  },
  {
    path: "/faqs",
    element: <FaqPage />
  }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
