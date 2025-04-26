import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_QUESTIONS } from "@/constants/faqs";

export default function FAQ() {
  return (
    <section id="faq" className=" p-6 md:p-16 lg:p-28 bg-secondary max-w-7xl mx-auto rounded-xl ">
      <div className=" text-center">
        <h1 className="text-3xl lg:text-5xl text-accent py-8 capitalize font-semibold">Frequently asked questions.</h1>
      </div>
      <Accordion type="single" collapsible className="">
        {FAQ_QUESTIONS.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="">
            <AccordionTrigger className=" text-lg lg:text-2xl text-left leading-[1.4] hover:text-accent transition-all duration-150  text-white ease-in py-6 px-4 rounded-md hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className=" text-lg px-4 pt-4 text-accent">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
