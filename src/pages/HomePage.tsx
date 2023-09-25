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
        "bg-cover h-screen flex flex-col justify-start items-start py-8"
      }
      style={backgroundImageStyle}
    >
      <div className={"w-full flex flex-col space-y-2 px-10"}>
        <h1 className={"text-4xl sm:text-6xl font-bold"}>Fellwanderers</h1>
        <h2 className={"text-2xl sm:text-4xl pb-5"}>Imperial's Hiking Society</h2>
        <div className={"flex flex-row justify-start space-x-5"}>
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

function Description() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-300 bg-opacity-50 p-4 rounded-lg w-2/3">
        <h1 className="text-xl font-semibold text-center text-gray-800">
          About Us
        </h1>
        <p className="my-2 text-lg text-gray-600 text-center">
          As the official hiking society for Imperial College London, we are your gateway to discovering the breathtaking landscapes and hidden gems of the United Kingdom. We will take you on unforgettable hiking experiences that encompass day hikes, thrilling weekend trips, and captivating tours across the UK.
          We are also looking for experienced hikers to help out with leading these trips, so get in touch if you are interested.
        </p>
        <h1 className="text-xl font-semibold text-center text-gray-800">
          Explore Nature, Create Memories
        </h1>
        <p className="my-2 text-lg text-gray-600 text-center">
          But we're more than just a hiking club; we're a community of like-minded individuals who share a passion for the great outdoors. When you join us, you're not just signing up for hikes; you're joining a group of kindred spirits who relish the opportunity to escape the bustling city of London and immerse themselves in the tranquility of nature. Our hikes aren't just about the breathtaking views and challenging trails; they're about the connections you make and the conversations you have along the way.
        </p>
        <h1 className="text-xl font-semibold text-center text-gray-800">
          Hiking and So Much More
        </h1>
        <p className="my-2 text-lg text-gray-600 text-center">
          From striking up great conversations while trekking through beautiful landscapes to unforgettable social events both on campus and in the heart of London, our club offers a vibrant social aspect that complements our outdoor adventures. Whether it's a casual chat during a hike or a lively gathering at one of our socials, you'll find yourself surrounded by welcoming faces and fantastic company.
        </p>
        <h1 className="text-xl font-semibold text-center text-gray-800">
          Join the Adventure
        </h1>
        <p className="my-2 text-lg text-gray-600 text-center">
          If you're seeking a club that combines the thrill of hiking through stunning locations with the joy of forging meaningful connections, you've found your perfect match. Join us, and let's explore the wonders of the UK together, one step at a time.
          At Fellwanderers, we're not just a club; we're a community of nature enthusiasts, adventurers, and friends. Get ready to leave the city behind, embark on unforgettable journeys, and create memories that will last a lifetime. Welcome to Fellwanderers!
        </p>
      </div>
    </div>
  )
}
export default function HomePage() {
  return (
    <div>
      <PageHeader />
      <HeroSection />
      <Description />
      <PageFooter />
    </div>
  );
}
