import PageHeader from "../components/PageHeader";
import TextImage from "../components/TextImage";

export default function HomePage() {
  const about: JSX.Element = (
    <div>
      <p>
        We are Fellwanderers, the hiking society of Imperial College London.
        From single-day getaways to weekend trips and holiday tours, we have you covered for all your hiking needs.
      </p>
      <p>
        Love the hiking in the outdoors? Want to escape London for a bit?
        Or even just want to chat and eat in beautiful places?
        Then follow the link below to join us today!
      </p>
      <a href="https://www.imperialcollegeunion.org/activities/a-to-z/fellwanderers" target="_blank">Join Fellwanderers</a>
    </div>
  );
  const shop: JSX.Element = (
    <div>
      <a href="https://www.imperialcollegeunion.org/shop/student-groups/407" target="_blank">Fellwanderers Shop</a>
    </div>
  );
  const followUs: JSX.Element = (
    <div>
      <a href="https://www.instagram.com/icfellwanderers/" target="_blank">Follow Us</a>
    </div>
  );
  const mail: JSX.Element = (
    <div>
      <a href="https://mailman.ic.ac.uk/mailman/listinfo/fellwanderers" target="_blank">Mailing List</a>
    </div>
  );
  return (
    <div>
      <PageHeader />
      <TextImage title={"About"} content={about} src={"LakeDistrict22.jpg"} alt={"Lake District 2022"} textLeft={true} />
      <TextImage title={"Fellwanderers Shop"} content={shop} src={"Snowdonia22.jpg"} alt={"Snowdonia 2022"} textLeft={false} />
      <TextImage title={"Follow Us"} content={followUs} src={"Dales22.jpg"} alt={"Yorkshire Dales 2022"} textLeft={true} />
      <TextImage title={"Mailing List"} content={mail} src={"JurassicCoast22.jpg"} alt={"Jurassic Coast 2022"} textLeft={false} />
      
      {/*nice formatting: https://flowbite.com/docs/typography/links/*/}
      {/*use heroicons*/}
    </div>
  )
}