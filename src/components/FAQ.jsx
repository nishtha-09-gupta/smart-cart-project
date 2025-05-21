import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I add items to my grocery list?",
      answer: "Simply click the 'Add Item' button and fill in the item details including name, category, and price."
    },
    {
      question: "Can I organize items by category?",
      answer: "Yes! You can filter items by category using the filter dropdown in the grocery list."
    },
    {
      question: "How do I update item quantities?",
      answer: "Click on any item in your list to edit its details, including quantity and price."
    },
    {
      question: "Is my data saved automatically?",
      answer: "Yes, all changes are automatically saved to your account."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-header">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-description">
          Find answers to common questions about using our grocery list app
        </p>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
          >
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <h3>{faq.question}</h3>
              <div className="faq-toggle">
                {openIndex === index ? "−" : "+"}
              </div>
            </div>
            <div className="faq-answer">
              <div className="faq-answer-content">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ; 
