import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faBagShopping } from "@fortawesome/free-solid-svg-icons";

import StyledLink from "../components/StyledLink.tsx";

const instaLink = "https://www.instagram.com/icfellwanderers";
const shopLink = "https://www.imperialcollegeunion.org/shop/student-groups/407";
const mailLink = "https://mailman.ic.ac.uk/mailman/listinfo/fellwanderers";

export default function PageFooter() {
  return (
    <div className={"w-screen h-20 px-2 sm:px-0"}>
      <div className={"bg-white pt-2 mb-4 shadow-md"}>
      </div>
      <div className={"flex flex-row justify-end space-x-5 px-10 items-center"}>
        <StyledLink href={instaLink}
                    className={"inline-block p-2 bg-green-900/50 font-semibold rounded-md no-underline hover:bg-green-900/60"}
                    children={(
                      <div>
                        <FontAwesomeIcon icon={faInstagram} /> Follow Us
                      </div>
                    )}
        />
        <StyledLink href={mailLink}
                    className={"inline-block p-2 bg-green-900/50 font-semibold rounded-md no-underline hover:bg-green-900/60"}
                    children={(
                      <div>
                        <FontAwesomeIcon icon={faEnvelope} /> Mailing List
                      </div>
                    )}
        />
        <StyledLink href={shopLink}
                    className={"inline-block p-2 bg-green-900/50 font-semibold rounded-md no-underline hover:bg-green-900/60"}
                    children={(
                      <div>
                        <FontAwesomeIcon icon={faBagShopping} /> Union Shop
                      </div>
                    )}
        />
      </div>
    </div>
  )
}