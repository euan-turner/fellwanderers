import React, { useState } from 'react';
import { Faq } from "../types/Faq";

interface AddFaqFormProps { 
  onSubmit: (faq: Faq) => void;
  isValidFaq: (faq: Faq) => [boolean, string | null];
}

export function AddFaqForm({ onSubmit, isValidFaq }: AddFaqFormProps) {
  const [order, setOrder] = useState<number>(0);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const faq: Faq = {
      order, question, answer
    };

    const[isValid, err] = isValidFaq(faq);
    setError(err);
    if (isValid) {
      onSubmit(faq);
      setOrder(0);
      setQuestion('');
      setAnswer('');
    }    
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red'}}>{error}</div>}
      <div>
        <label>
          Order:
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value))}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Answer:
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}