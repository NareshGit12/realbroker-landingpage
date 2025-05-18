
import React from 'react';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
  value: string;
}

interface FAQSectionProps {
  title: string;
  faqs: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ title, faqs }) => {
  return (
    <RevealAnimation>
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.value} value={faq.value}>
              <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </RevealAnimation>
  );
};

export default FAQSection;
