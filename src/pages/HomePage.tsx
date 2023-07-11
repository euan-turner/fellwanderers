import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPersonHiking, faBagShopping, faHashtag, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import PageHeader from "../components/PageHeader";
import TextImage from "../components/TextImage";
import StyledLink from "../components/StyledLink.tsx";

const socLink = "https://www.imperialcollegeunion.org/activities/a-to-z/fellwanderers";
const shopLink = "https://www.imperialcollegeunion.org/shop/student-groups/407";
const instaLink = "https://www.instagram.com/icfellwanderers";
const mailLink = "https://mailman.ic.ac.uk/mailman/listinfo/fellwanderers";

const about: JSX.Element = (
  <div>
    <p>
      We are Fellwanderers, the hiking society of Imperial College London.
      From single-day getaways to weekend trips and holiday tours, we have you covered for all your hiking needs
      <br/>
      Love the hiking in the outdoors? Want to escape London for a bit?
      Or even just want to chat and eat in beautiful places?
      Then follow the link below to join us today!
    </p>
    <StyledLink
      href={socLink}
      className={"inline-block p-2 bg-green-900/50 font-semibold rounded-md no-underline hover:bg-green-900/60"}
      children={(
        <div>
          <FontAwesomeIcon icon={faPersonHiking} /> Join Fellwanderers
        </div>
      )}
    />
  </div>
);
// use bag-shopping font awesome
const shop: JSX.Element = (
  <div>
    <p>
      Fancy a day away from London with us at the weekend? You'll need to head on over to our union shop to get a ticket.
    </p>
    <p>
      Tour tickets and merch will be available as well once they're organised.
    </p>
    <StyledLink
      href={shopLink}
      className={"inline-block p-2 bg-green-900/50 font-semibold rounded-md no-underline hover:bg-green-900/60"}
      children={(
        <div>
          <FontAwesomeIcon icon={faBagShopping} /> Union Shop
        </div>
      )}
    />
  </div>
);
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
    title: "About",
    content: about,
    src: "hike_pics/LakeDistrict22.jpg",
    alt: "Lake District 2022",
    textLeft: true
  },
  {
    title: "Fellwanderers Shop",
    content: shop,
    src: "hike_pics/Snowdonia22.jpg",
    alt: "Snowdonia 2022",
    textLeft: false
  },
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
export default function HomePage() {
  return (
    <div>
      <PageHeader />
      <div className={"grid grid-cols-1"}>
        {sections.map((section) => (
          <TextImage title={section.title} content={section.content} src={section.src} alt={section.alt} textLeft={section.textLeft} />
        ))}
      </div>
    </div>
  )
}