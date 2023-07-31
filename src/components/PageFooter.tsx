import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faBagShopping, faArrowRightToBracket,  faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase.ts";
import LoginPopup from "./LoginPopup.tsx";
import StyledButton from "../components/StyledButton.tsx";
import StyledLink from "../components/StyledLink.tsx";

const instaLink = "https://www.instagram.com/icfellwanderers";
const shopLink = "https://www.imperialcollegeunion.org/shop/student-groups/407";
const mailLink = "https://mailman.ic.ac.uk/mailman/listinfo/fellwanderers";

export default function PageFooter() {
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);
  const [showLoginButton, setShowLoginButton] = useState<boolean>(true);

  const handleLoginButtonClick = () => {
    setShowLoginPopup(true);
  }
  const handleLoginClose = () => {
    setShowLoginPopup(false);
    if (auth.currentUser) {
      setShowLoginButton(false);
    }
  }
  const handleLogoutButtonClick = () => {
    signOut(auth)
      .then(() => {
        setShowLoginButton(true);
      })
      .catch((error) => {
        console.log(error.message);
      })
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
        { 
          showLoginPopup && 
          <LoginPopup onClose={handleLoginClose} />
        }

        {
          showLoginButton && 
          <StyledButton
          className={linkStyle}
          onClick={handleLoginButtonClick}
          children={
            <div>
              <FontAwesomeIcon icon={faArrowRightToBracket} /> Log In
            </div>
          }
          />
        }
        
        {
          !showLoginButton &&
          <StyledButton
          className={linkStyle}
          onClick={handleLogoutButtonClick}
          children={
            <div>
              <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log Out
            </div>
          }
          />
        }
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
