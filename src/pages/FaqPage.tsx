import { Disclosure, Tab } from "@headlessui/react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import { setCollectionState, Doc } from "../../firebaseAPI.ts";
import { Faq } from "../types/Faq.ts";
import { useAuth } from "../contexts/AuthContext.tsx";
import { AddFaqForm } from "../components/FaqForms.tsx";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebase.ts";

interface FAQProps {
  faq: Faq
}

function FAQ({ faq }: FAQProps) {
  const {order, question, answer} = faq;
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-logoGreen-light px-4 py-2 text-left text-sm font-medium text-black border border-logoGreen-dark hover:bg-logoGreen-light/70 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
            <span>{order.toString().concat(". ").concat(question)}</span>
            <FontAwesomeIcon icon={faChevronDown}
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-black`}
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

interface CommitteeUpdatesProps{
  faqDocs: Doc<Faq>[]
}


function CommitteeUpdates({ faqDocs }: CommitteeUpdatesProps) {
  const handleFaqSubmit = (faq: Faq)=>{console.log(faq)};
  const validFaq = (faq: Faq) => {
    const res = faq.order !== 0 && faq.question.trim() !== '' && faq.answer.trim() !== '';
    const ret: [boolean, string | null] =  [res, res ? null : 'All fields must be populated'];
    return ret;
  }
  return (
    <Tab.Group>
      <Tab.List>
        <Tab>Add FAQ</Tab>
        <Tab>Edit FAQ</Tab>
        <Tab>Delete FAQ</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <AddFaqForm onSubmit={handleFaqSubmit} isValidFaq={validFaq} />
        </Tab.Panel>
        <Tab.Panel>Edit</Tab.Panel>
        <Tab.Panel>Delete</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

// const newIds = (faqs: Faq[]) => {
//   faqs.forEach(async (faq) => {
//     const docRef = await addDoc(collection(db, "faqs"), faq);
//     console.log("New ID: ", docRef.id);
//   })
// }

export default function FaqPage() {
  const [faqDocs, setFaqDocs] = useState<Doc<Faq>[]>([]);
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    setCollectionState<Faq>(
      "faqs", 
      (a, b) => a.order - b.order, 
      setFaqDocs, 
      (a) => a,
      (a) => a as Faq
      );
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
        {faqDocs.map(({ data }, index) => {
          return (
          <div key={index}>
            <FAQ faq={data} />
          </div>)
        })}
      </div>
      {
        isLoggedIn && 
        <CommitteeUpdates faqDocs={faqDocs} />
      }
    </div>  
    <PageFooter />
    </>
  )
}