import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonHiking,
  faArrowRight,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import StyledLink from "../components/StyledLink.tsx";

const socLink =
  "https://www.imperialcollegeunion.org/activities/a-to-z/fellwanderers";
const joinLink =
  "https://www.imperialcollegeunion.org/shop/csp/fellwanderers/fellwanderers-imperial-hiking-society-membership-22-23";

function HeroSection() {
  const backgroundImageStyle = {
    backgroundImage: `url(/hike_pics/LakeDistrict22.jpg)`,
  };
  return (
    <section
      className={
        "bg-cover bg-center h-screen flex flex-col justify-start items-start p-16"
      }
      style={backgroundImageStyle}
    >
      <div className={"w-1/2"}>
        <h1 className={"text-6xl font-bold px-10"}>Fellwanderers</h1>
        <h2 className={"text-4xl px-10 pb-5"}>Imperial's Hiking Society</h2>
        <div className={"flex flex-row w-1/2 justify-start space-x-5 px-10"}>
          <StyledLink
            href={joinLink}
            className={
              "shadow-md inline-block p-2 bg-logoGreen-light border-logoGreen-dark border font-semibold rounded-md no-underline hover:bg-green-900/60"
            }
            children={
              <div>
                <FontAwesomeIcon icon={faPersonHiking} /> Join Now{" "}
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            }
          />
          <StyledLink
            href={socLink}
            className={
              "shadow-md inline-block p-2 bg-logoGreen-light border-logoGreen-dark border font-semibold rounded-md no-underline hover:bg-green-900/60"
            }
            children={
              <div>
                <FontAwesomeIcon icon={faCircleInfo} /> More Info{" "}
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
export default function HomePage() {
  return (
    <div>
      <PageHeader />
      <HeroSection />
      <PageFooter />
    </div>
  );
}
