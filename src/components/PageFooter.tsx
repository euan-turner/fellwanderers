import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faBagShopping, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import LoginPopup from "./LoginPopup.tsx";
import StyledButton from "../components/StyledButton.tsx";
import StyledLink from "../components/StyledLink.tsx";

const instaLink = "https://www.instagram.com/icfellwanderers";
const shopLink = "https://www.imperialcollegeunion.org/shop/student-groups/407";
const mailLink = "https://mailman.ic.ac.uk/mailman/listinfo/fellwanderers";

export default function PageFooter() {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const handleLoginButtonClick = () => {
    setShowLogin(true);
  }
  const handleLoginClose = () => {
    setShowLogin(false);
  }

  const linkStyle =
    "shadow-md inline-block p-2 bg-logoGreen-light border-logoGreen-dark border text-xs sm:text-sm font-semibold rounded-md no-underline hover:bg-green-900/60";
  return (
    <div className={"w-screen h-20 px-0 sm:px-2"}>
      <div className={"bg-white pt-2 mb-4 shadow-md"}></div>
      <div
        className={
          "flex flex-row justify-center sm:justify-end space-x-5 px-1 sm:px-2 items-center"
        }
      >
        { showLogin && 
          <LoginPopup onClose={handleLoginClose} />
        }
        
        <StyledButton
          className={linkStyle}
          onClick={handleLoginButtonClick}
          children={
            <div>
              <FontAwesomeIcon icon={faArrowRightToBracket} /> Log In
            </div>
          }
        />
        <StyledLink
          href={instaLink}
          className={linkStyle}
          children={
            <div>
              <FontAwesomeIcon icon={faInstagram} /> Follow Us
            </div>
          }
        />
        <StyledLink
          href={mailLink}
          className={linkStyle}
          children={
            <div>
              <FontAwesomeIcon icon={faEnvelope} /> Mailing List
            </div>
          }
        />
        <StyledLink
          href={shopLink}
          className={linkStyle}
          children={
            <div>
              <FontAwesomeIcon icon={faBagShopping} /> Union Shop
            </div>
          }
        />
      </div>
    </div>
  );
}
