import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const FAQ = () => {
  const { isDarkMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "How does SmartCart work?",
      answer: "SmartCart helps you manage your grocery shopping by creating and organizing shopping lists, suggesting recipes based on your ingredients, and helping you track your purchases."
    },
    {
      question: "Is SmartCart free to use?",
      answer: "Yes, SmartCart is completely free to use! We offer all basic features at no cost."
    },
   
    {
      question: "How do I add items to my shopping list?",
      answer: "You can add items through the quick add form on the home page or in the shopping list section. Just type the item name and select a category."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <button 
              className="faq-question"
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              {faq.question}
              <span className="faq-icon" aria-hidden="true">
                {activeIndex === index ? '−' : '+'}
              </span>
            </button>
            <div 
              id={`faq-answer-${index}`}
              className="faq-answer"
              role="region"
              aria-labelledby={`faq-question-${index}`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ; 