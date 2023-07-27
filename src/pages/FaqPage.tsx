import { Disclosure } from "@headlessui/react";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

interface faq {
  question: string,
  answer: string
}

const faqs: faq[] = [
  {
    question: "When do you do hikes?",
    answer: "On weekends, either single-day or weekend trips. We also organise tours in the holidays",
  },
  {
    question: "Do you have social activities?",
    answer: "Yes, we meet for a tea break every Friday on Queen's Lawn",
  },
  {
    question: "When do you do hikes?",
    answer: "On weekends, either single-day or weekend trips. We also organise tours in the holidays",
  },
  {
    question: "Do you have social activities?",
    answer: "Yes, we meet for a tea break every Friday on Queen's Lawn",
  },
  {
    question: "When do you do hikes?",
    answer: "On weekends, either single-day or weekend trips. We also organise tours in the holidays",
  },
  {
    question: "Do you have social activities?",
    answer: "Yes, we meet for a tea break every Friday on Queen's Lawn",
  },
  {
    question: "When do you do hikes?",
    answer: "On weekends, either single-day or weekend trips. We also organise tours in the holidays",
  },
  {
    question: "Do you have social activities?",
    answer: "Yes, we meet for a tea break every Friday on Queen's Lawn",
  },
  {
    question: "When do you do hikes?",
    answer: "On weekends, either single-day or weekend trips. We also organise tours in the holidays",
  },
  {
    question: "Do you have social activities?",
    answer: "Yes, we meet for a tea break every Friday on Queen's Lawn",
  },
  {
    question: "When do you do hikes?",
    answer: "On weekends, either single-day or weekend trips. We also organise tours in the holidays",
  },
  {
    question: "Do you have social activities?",
    answer: "Yes, we meet for a tea break every Friday on Queen's Lawn",
  },
  {
    question: "When do you do hikes?",
    answer: "On weekends, either single-day or weekend trips. We also organise tours in the holidays",
  },
  {
    question: "Do you have social activities?",
    answer: "Yes, we meet for a tea break every Friday on Queen's Lawn",
  }
]

const FAQ = ({question, answer}: faq) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>{question}</span>
            <FontAwesomeIcon icon={faChevronDown}
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-purple-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
            {answer}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}


export default function FaqPage() {
  return (
    <>
    <PageHeader />
    <div className={"flex flex-col justify-center items-center sm:w-1/2 mx-auto h-screen"}>
      <h2 className={"w-full text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl px-4 lg:px-8"}>
        FAQs
      </h2>
      <p className={"w-full font-bold tracking-tight text-gray-700 px-4 lg:px-8 pt-2"}>
        If you don't find the answers you need here, e-mail us at fellsoc@imperial.ac.uk
      </p>
      <div className="flex flex-col space-y-5 w-full px-4 lg:px-8 py-4 lg:py-8 h-max-screen overflow-y-auto">
        {faqs.map((faq, index) => {
          return (
          <div key={index}>
            <FAQ question={faq.question} answer={faq.answer} />
          </div>)
        })}
      </div>
    </div>
  
    <PageFooter />
    </>
  )
}