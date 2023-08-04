import React, { useState } from 'react';
import { Faq } from "../types/Faq";
import { Doc } from "../../firebaseAPI"

type SetFaqDocState = React.Dispatch<React.SetStateAction<Doc<Faq>[]>>;
type AddFaqFormSubmit = (faq: Faq, faqDocs: Doc<Faq>[], setState: SetFaqDocState) => void;
interface AddFaqFormProps { 
  onSubmit: AddFaqFormSubmit;
  isValidAdd: (faq: Faq) => [boolean, string | null];
  faqDocs: Doc<Faq>[];
  setState: SetFaqDocState;
}

export function AddFaqForm({ onSubmit, isValidAdd, faqDocs, setState }: AddFaqFormProps) {
  const [order, setOrder] = useState<number>(0);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const faq: Faq = {
      order, question, answer
    };

    const[isValid, err] = isValidAdd(faq);
    setError(err);
    if (isValid) {
      onSubmit(faq, faqDocs, setState);
      setOrder(0);
      setQuestion('');
      setAnswer('');
    }    
  };

  return (
    <div className={"p-2"}>
      <form onSubmit={handleSubmit}>
      {error && <div className={"text-red-500"}>{error}</div>}
      <div>
        <label className={"block mb-2"}>
          {"Number: "}
          <input
            type="number"
            min="1"
            max={faqDocs.length + 1}
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value))}
            required
          />
        </label>
      </div>
      <div>
        <label className={"block mb-2"}>
          {"Question: "}
          <input
            className={"mx-2 border border-black"}
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label className={"mb-2 flex items-start"}>
          {"Answer: "}
          <textarea
            className={"w-full mx-2 border border-black"}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </label>
      </div>
      <button 
      type="submit" className={"shadow-md inline-block p-2 bg-logoGreen-light border-logoGreen-dark border text-xs sm:text-sm font-semibold rounded-md no-underline hover:bg-green-900/60"}>Submit</button>
    </form>
  </div>
  )
}

type EditFaqFormSubmit = (newFaq: Faq, oldNumber: number, faqDocs: Doc<Faq>[], setState: SetFaqDocState) => void;
interface EditFaqFormProps {
  onSubmit: EditFaqFormSubmit;
  isValidEdit: (newFaq: Faq, num: number, faqDocs: Doc<Faq>[]) => [boolean, string | null];
  faqDocs: Doc<Faq>[];
  setState: SetFaqDocState;
}

export function EditFaqForm({ onSubmit, isValidEdit, faqDocs, setState}: EditFaqFormProps) {
  const [oldOrder, setOldOrder] = useState<number>(0);
  const [newOrder, setNewOrder] = useState<number>(0);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFaq: Faq = {
      order: newOrder, question, answer
    };

    const [isValid, err] = isValidEdit(newFaq, oldOrder, faqDocs);
    setError(err);
    if (isValid) {
      onSubmit(newFaq, oldOrder, faqDocs, setState);
      setOldOrder(0);
      setNewOrder(0);
      setQuestion('');
      setAnswer('');
    }
  };
  // TODO: Auto-populate fields with oldNumber's data
  return (
    <div className={"p-2"}>
      <form onSubmit={handleSubmit}>
      {error && <div className={"text-red-500"}>{error}</div>}
      <div>
        <label className={"block mb-2"}>
          {"Old Number: "}
          <input
            type="number"
            min="1"
            max={faqDocs.length}
            value={oldOrder}
            onChange={(e) => setOldOrder(parseInt(e.target.value))}
            required
          />
        </label>
      </div>
      <div>
        <label className={"block mb-2"}>
          {"New Number: "}
          <input
            type="number"
            min="1"
            max={faqDocs.length}
            value={newOrder}
            onChange={(e) => setNewOrder(parseInt(e.target.value))}
            required
          />
        </label>
      </div>
      <div>
        <label className={"block mb-2"}>
          {"Question: "}
          <input
            className={"mx-2 border border-black"}
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label className={"mb-2 flex items-start"}>
          {"Answer: "}
          <textarea
            className={"w-full mx-2 border border-black"}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit" className={"shadow-md inline-block p-2 bg-logoGreen-light border-logoGreen-dark border text-xs sm:text-sm font-semibold rounded-md no-underline hover:bg-green-900/60"}>Submit</button>
    </form>
  </div>
  )
}

type DeleteFaqFormSubmit = (faqNumber: number, faqDocs: Doc<Faq>[], setState: SetFaqDocState) => void;
interface DeleteFaqFormProps {
  onSubmit: DeleteFaqFormSubmit;
  isValidDelete: (faqNumber: number, faqDocs: Doc<Faq>[]) => [boolean, string | null];
  faqDocs: Doc<Faq>[];
  setState: SetFaqDocState;
}

export function DeleteFaqForm({ onSubmit, isValidDelete, faqDocs, setState}: DeleteFaqFormProps) {
  const [number, setNumber] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [isValid, err] = isValidDelete(number, faqDocs);
    setError(err);
    if (isValid) {
      onSubmit(number, faqDocs, setState);
      setNumber(0);
    }
  };
  return (
    <div className={"p-2"}>
      <form onSubmit={handleSubmit}>
      {error && <div className={"text-red-500"}>{error}</div>}
      <div>
        <label className={"block mb-2"}>
          {"Number: "}
          <input
            type="number"
            value={number}
            min="1"
            max={faqDocs.length}
            onChange={(e) => setNumber(parseInt(e.target.value))}
            required
          />
        </label>
      </div>
      <button type="submit" className={"shadow-md inline-block p-2 bg-logoGreen-light border-logoGreen-dark border text-xs sm:text-sm font-semibold rounded-md no-underline hover:bg-green-900/60"}>Submit</button>
    </form>
  </div>
  )
}