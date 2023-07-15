import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPersonHiking, faHashtag, faEnvelope, faArrowRight, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import TextImage from "../components/TextImage";
import StyledLink from "../components/StyledLink.tsx";

const socLink = "https://www.imperialcollegeunion.org/activities/a-to-z/fellwanderers";
const joinLink = "https://www.imperialcollegeunion.org/shop/csp/fellwanderers/fellwanderers-imperial-hiking-society-membership-22-23";
const instaLink = "https://www.instagram.com/icfellwanderers";
const mailLink = "https://mailman.ic.ac.uk/mailman/listinfo/fellwanderers";

// use instagram font awesome
const followUs: JSX.Element = (
  <div>
    <p>
      We'll be posting pictures from all our hikes in Instagram, so head on over there to get your nature fix.
    </p>
    <StyledLink
      href={instaLink}
      className={"inline-block p-2 bg-green-900/50 font-semibold rounded-md no-underline hover:bg-green-900/60"}
      children={(
        <div>
          <FontAwesomeIcon icon={faHashtag} /> Instagram
        </div>
      )}
    />
  </div>
);
// use envelope font awesome
const mail: JSX.Element = (
  <div>
    <p>
      Sign up to our weekly mailing list to keep up to date with all things Fellwanderers.
    </p>
    <p>
      We'll communicate all hikes, tours and other meet ups through here.
    </p>
    <StyledLink
      href={mailLink}
      className={"inline-block p-2 bg-green-900/50 font-semibold rounded-md no-underline hover:bg-green-900/60"}
      children={(
        <div>
          <FontAwesomeIcon icon={faEnvelope} /> Mailing List
        </div>
      )}
    />
  </div>
);

const sections = [
  {
    title: "Follow Us",
    content: followUs,
    src: "hike_pics/Dales22.jpg",
    alt: "Yorkshire Dales 2022",
    textLeft: true
  },
  {
    title: "Mailing List",
    content: mail,
    src: "hike_pics/JurassicCoast22.jpg",
    alt: "Jurassic Coast 2022",
    textLeft: false
  }
]

function HeroSection() {
  const backgroundImageStyle = {
    backgroundImage: `url(/hike_pics/LakeDistrict22.jpg)`
  }
  return (
    <section className={"bg-cover bg-center h-screen flex flex-col justify-start items-start p-16"} style={backgroundImageStyle}>
      <div className={"w-1/2"}>
        <h1 className={"text-6xl font-bold px-10"}>Fellwanderers</h1>
        <h2 className={"text-4xl px-10 pb-5"}>Imperial's Hiking Society</h2>
        <div className={"flex flex-row w-1/2 justify-start space-x-5 px-10"}>
          <StyledLink
            href={joinLink}
            className={"inline-block p-2 bg-green-900/50 font-semibold rounded-md no-underline hover:bg-green-900/60"}
            children={(
              <div>
                <FontAwesomeIcon icon={faPersonHiking} /> Join Now <FontAwesomeIcon icon={faArrowRight} />
              </div>
            )}
          />
          <StyledLink
            href={socLink}
            className={"inline-block p-2 bg-green-900/50 font-semibold rounded-md no-underline hover:bg-green-900/60"}
            children={(
              <div>
                <FontAwesomeIcon icon={faCircleInfo} /> More Info <FontAwesomeIcon icon={faArrowRight} />
              </div>
            )}
          />
        </div>
      </div>
    </section>
  )
}
export default function HomePage() {
  return (
    <div>
      <PageHeader />
      <HeroSection />
      <div className={"grid grid-cols-1"}>
        {sections.map((section) => (
          <TextImage title={section.title} content={section.content} src={section.src} alt={section.alt} textLeft={section.textLeft} />
        ))}
      </div>
      <PageFooter />
    </div>
  )
}