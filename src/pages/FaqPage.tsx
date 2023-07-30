import { Disclosure } from "@headlessui/react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import { setStateData } from "../../firebaseAPI.ts"
import { Faq } from "../types/Faq.ts";


// async function storeFaq(faq: Faq) {
//   await setDoc(doc(db, "faqs", faq.id.toString()), faq)
// }

const FAQ = ({id, question, answer}: Faq) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-logoGreen-light px-4 py-2 text-left text-sm font-medium text-black border border-logoGreen-dark hover:bg-logoGreen-light/70 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
            <span>{id.toString().concat(". ").concat(question)}</span>
            <FontAwesomeIcon icon={faChevronDown}
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-logoGreen-dark`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-700">
            {answer}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}


export default function FaqPage() {
  const [faqData, setFaqData] = useState<Faq[]>([]);
  useEffect(() => {
    setStateData<Faq>("faqs", (a, b) => a.id - b.id, setFaqData, (a) => a);
  }, [])
  return (
    <>
    <PageHeader />
    <div className={"flex flex-col justify-start items-center sm:w-1/2 mx-auto h-screen sm:py-8"}>
      <h2 className={"w-full text-3xl font-bold tracking-tight text-black sm:text-4xl px-4 lg:px-8"}>
        FAQs
      </h2>
      <p className={"w-full font-bold tracking-tight text-black px-4 lg:px-8 pt-2"}>
        If you don't find the answers you need here, e-mail us at fellsoc@imperial.ac.uk
      </p>
      <div className="flex flex-col space-y-5 w-full px-4 lg:px-8 py-4 lg:py-8 h-max-screen overflow-y-auto">
        {faqData.map((faq, index) => {
          return (
          <div key={index}>
            <FAQ id={faq.id} question={faq.question} answer={faq.answer} />
          </div>)
        })}
      </div>
    </div>
  
    <PageFooter />
    </>
  )
}