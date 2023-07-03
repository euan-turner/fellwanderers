import PageHeader from "../components/PageHeader";
import TextImage from "../components/TextImage";

export default function HomePage() {
  return (
    <div>
      <PageHeader />
      <TextImage title={"Join Us"} text={"Link to Website"} src={"templogo.png"} alt={"alt"} textLeft={true} />
      <TextImage title={"Fellwanderers Shop"} text={"Link to Website"} src={"templogo.png"} alt={"alt"} textLeft={false} />
      <TextImage title={"Mailing List"} text={"Link to Website"} src={"templogo.png"} alt={"alt"} textLeft={true} />
      <TextImage title={"Follow Us"} text={"Link to Website"} src={"templogo.png"} alt={"alt"} textLeft={false} />
      
      <div>
        <h3>Get Involved</h3>
        <ul>
          <li>
            <a href="https://www.imperialcollegeunion.org/activities/a-to-z/fellwanderers" target="_blank">Join Us</a>
          </li>
          <li>
            <a href="https://www.imperialcollegeunion.org/shop/student-groups/407" target="_blank">Fellwanderers Shop</a>
          </li>
          <li>
            <a href="https://mailman.ic.ac.uk/mailman/listinfo/fellwanderers" target="_blank">Mailing List</a>
          </li>
          <li>
            <a href="https://www.instagram.com/icfellwanderers/" target="_blank">Follow Us</a>
          </li>
        </ul>
      </div>
      {/*nice formatting: https://flowbite.com/docs/typography/links/*/}
      {/*use heroicons*/}
    </div>
  )
}