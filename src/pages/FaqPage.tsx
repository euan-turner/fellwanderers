import { Disclosure, Tab } from "@headlessui/react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import StyledButton from "../components/StyledButton";
import { setCollectionState, Doc } from "../../firebaseAPI.ts";
import { Faq } from "../types/Faq.ts";
import { useAuth } from "../contexts/AuthContext.tsx";
import { AddFaqForm, EditFaqForm, DeleteFaqForm } from "../components/FaqForms.tsx";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.ts";

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
  faqDocs: Doc<Faq>[];
  setFaqDocs: React.Dispatch<React.SetStateAction<Doc<Faq>[]>>;
}

// TODO: Refactor with currying to reduce parameters
const handleAddFaqSubmit = (faq: Faq, faqDocs: Doc<Faq>[], setState: React.Dispatch<React.SetStateAction<Doc<Faq>[]>>)=>{
  const newDoc: Doc<Faq> = { id: null, data: faq};
  if (faq.order <= faqDocs.length) {
    {/*Re-order existing docs*/}
    faqDocs.filter((doc: Doc<Faq>) => doc.data.order >= faq.order)
    .forEach((doc: Doc<Faq>) => doc.data.order++);
  }
  faqDocs.push(newDoc);
  setState(faqDocs.sort((a, b) => a.data.order - b.data.order));
};

const isValidAddFaq = (faq: Faq): [boolean, string | null] => {
  if (faq.order === 0) {
    return [false, "FAQ number cannot be 0"];
  }
  if (faq.question.trim() === '') {
    return [false, "FAQ question cannot be empty"];
  }
  if (faq.answer.trim() === '') {
    return [false, "FAQ answer cannot be empty"];
  }
  return [true, null];
}

const handleEditFaqSubmit = (newFaq: Faq, oldNumber: number, faqDocs: Doc<Faq>[], setState: React.Dispatch<React.SetStateAction<Doc<Faq>[]>>) => {
  if (newFaq.order === oldNumber) {
    // Just replace data in doc
    faqDocs.forEach((doc) => {
      if (doc.data.order === oldNumber) {
        doc.data = newFaq;
      }
    })
  } else {
    // Replace data in doc, and swap orders
    faqDocs.forEach((doc) => {
      if (doc.data.order === oldNumber) {
        doc.data = newFaq;
      } else if (doc.data.order === newFaq.order) {
        doc.data.order = oldNumber;
      }
    })
  }
  setState(faqDocs.sort((a, b) => a.data.order - b.data.order));
};

const isValidEditFaq = (faq: Faq, num: number, faqDocs: Doc<Faq>[]): [boolean, string | null] => {
  if (num > faqDocs.length) {
    return [false, "Must edit existing FAQ"];
  }
  return isValidAddFaq(faq);
}

const handleDeleteFaqSubmit = (faqNumber: number, faqDocs: Doc<Faq>[], setState: React.Dispatch<React.SetStateAction<Doc<Faq>[]>>) => {
  const newFaqDocs = faqDocs.filter((doc) => {return doc.data.order !== faqNumber});
  newFaqDocs.forEach((doc) => {
    if (doc.data.order > faqNumber) {
      doc.data.order--;
    }
  })
  setState(newFaqDocs);
};

// TODO: Check if redundant
const isValidDeleteFaq = (faqNumber: number, faqDocs: Doc<Faq>[]): [boolean, string | null] => {
  if (faqNumber > faqDocs.length) {
    return [false, "Cannot delete non-existent FAQ"];
  }
  return [true, null];
}

function CommitteeUpdates({ faqDocs, setFaqDocs }: CommitteeUpdatesProps) {
  const baseTabStyle = "w-full rounded-md px-1 sm:px-2.5 py-2 lg:py-2.5 text-sm leading-5 text-black font-semibold " +
  "ring-white ring-opacity-60 ring-offset-2 ring-offset-logoGreen-light " +
  "focus:outline-none focus:ring-2 ";

  const handleSaveChangesClick = () => {
    // TODO: Need to handle deletion
    faqDocs.forEach(async (faqDoc) => {
      if (faqDoc.id) {
        await setDoc(doc(db, "faqs", faqDoc.id), faqDoc.data);
      } else {
        await addDoc(collection(db, "faqs"), faqDoc.data);
      }
    });
    alert("Saved Changes");
    localStorage.setItem("faqs", JSON.stringify(faqDocs));
  }
  return (
    <div className={"w-full px-4 lg:px-8"}>
      <Tab.Group>
        <Tab.List
              className={
                "max-h-12 flex lg:inline-flex w-full lg:min-w-max justify-around lg:justify-center items-center rounded-xl bg-logoGreen-light border-logoGreen-dark border py-2 px-1 lg:space-x-2"
              }
            >
          <Tab
                    className={({ selected }) =>
                      baseTabStyle.concat(
                        selected ? "bg-white shadow" : "hover:bg-white/20",
                      )
                    }
                  >Add FAQ</Tab>
          <Tab
                    className={({ selected }) =>
                      baseTabStyle.concat(
                        selected ? "bg-white shadow" : "hover:bg-white/20",
                      )
                    }
                  >Edit FAQ</Tab>
          <Tab
                    className={({ selected }) =>
                      baseTabStyle.concat(
                        selected ? "bg-white shadow" : "hover:bg-white/20",
                      )
                    }
                  >Delete FAQ</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <AddFaqForm onSubmit={handleAddFaqSubmit} isValidAdd={isValidAddFaq} faqDocs={[...faqDocs]} setState={setFaqDocs}/>
        </Tab.Panel>
        <Tab.Panel>
          <EditFaqForm onSubmit={handleEditFaqSubmit} isValidEdit={isValidEditFaq} faqDocs={[...faqDocs]} setState={setFaqDocs} />
        </Tab.Panel>
        <Tab.Panel>
          <DeleteFaqForm onSubmit={handleDeleteFaqSubmit} isValidDelete={isValidDeleteFaq} faqDocs={[...faqDocs]} setState={setFaqDocs} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
    <StyledButton className={"shadow-md inline-block p-2 bg-logoGreen-light border-logoGreen-dark border text-xs sm:text-sm font-semibold rounded-md no-underline hover:bg-green-900/60"}  children={<p>Save Changes</p>} onClick={handleSaveChangesClick}/>
    </div>
    
  )
}

export default function FaqPage() {
  const [faqDocs, setFaqDocs] = useState<Doc<Faq>[]>([]);
  const { isLoggedIn } = useAuth();

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
        <CommitteeUpdates faqDocs={faqDocs} setFaqDocs={setFaqDocs}/>
      }
    </div>  
    <PageFooter />
    </>
  )
}