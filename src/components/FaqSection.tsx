
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

interface FaqItem {
  question: string;
  answer: string;
}

const FaqSection: React.FC = () => {
  const faqs: FaqItem[] = [
    {
      question: "What does this tool do?",
      answer: "Our AI-powered tool automatically organizes, renames, and captions your scattered photos, then delivers them in a neatly structured zip file—ready for easy access."
    },
    {
      question: "How does the AI rename my photos?",
      answer: "The AI analyzes each image, detects relevant details (e.g., people, locations, objects), and renames files with clear, searchable labels instead of random numbers or timestamps."
    },
    {
      question: "Can it organize photos from multiple locations?",
      answer: "Yes! You can upload images from various sources, including your phone, cloud storage, and external hard drives."
    },
    {
      question: "How long does it take to organize my photos?",
      answer: "Processing time depends on the number of images, but most users get their organized zip file within minutes."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely! We use end-to-end encryption to ensure your photos remain private and secure. No images are stored after processing."
    },
    {
      question: "Will this delete my original photos?",
      answer: "No, the tool creates a new organized copy while keeping your original files untouched."
    },
    {
      question: "What file types does it support?",
      answer: "We support JPEG, PNG, HEIC, and most common image formats. Additional formats may be added in future updates."
    },
    {
      question: "Do I need to install anything?",
      answer: "No downloads required! Our tool runs 100% online, so you can organize your photos from any device with an internet connection."
    },
    {
      question: "How much does it cost?",
      answer: "We offer free and premium plans based on the number of photos you need to process. Check our pricing page for details."
    },
    {
      question: "How do I get started?",
      answer: "Simply upload your photos, let our AI work its magic, and download your fully organized zip file—it's that easy!"
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 mb-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <HelpCircle className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FaqSection;
