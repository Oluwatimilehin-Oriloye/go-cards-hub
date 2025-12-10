import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const faqs = [
  {
    question: "What is a GO Card?",
    answer: "A GO Card is a virtual or physical card linked to your GTBank account for secure local and international payments."
  },
  {
    question: "How do I create a virtual GO Card?",
    answer: "Go to \"Create Virtual Card,\" enter a card name, and confirm using OTP."
  },
  {
    question: "How do I fund my GO Card?",
    answer: "Use the \"Fund Card\" option, select which card you want to top up, and enter the amount."
  },
  {
    question: "Can I freeze or unfreeze a card?",
    answer: "Yes. Use the \"Freeze Card\" button inside card details. Frozen cards show an \"ice effect.\""
  },
  {
    question: "How do I delete a GO Card?",
    answer: "Choose \"Delete Card.\" The system will prompt you to confirm the reason. Funds are automatically returned to your main account."
  },
  {
    question: "How do I request a physical GO Card?",
    answer: "Go to \"Request Physical Card,\" choose pickup location (branch or home delivery), and track progress in the notification/tracking page."
  },
  {
    question: "How secure are GO Cards?",
    answer: "All cards are protected with advanced GTBank security, including encrypted transactions, OTP verification, and freeze/unfreeze control."
  },
  {
    question: "Why is my card declining?",
    answer: "Your card may decline due to insufficient funds, exceeded limits, network issues, or restrictions on the merchant."
  },
  {
    question: "How do I change my GO Card name?",
    answer: "Card names cannot be changed after creation. You can delete the card and create a new one with the preferred name."
  },
  {
    question: "Can I have multiple GO Cards?",
    answer: "Yes. You can create multiple virtual cards and use each one for different purposes (shopping, subscriptions, business, etc.)."
  },
  {
    question: "How do I see transaction details?",
    answer: "Tap any transaction on your dashboard. A modal will show the full details like amount, time, reference, and status."
  },
  {
    question: "What is the difference between a physical card and a virtual GO Card?",
    answer: "A virtual card exists only digitally. A physical card is physical and can be used at ATMs, POS, and online."
  },
  {
    question: "How long does it take to get a physical GO Card delivered?",
    answer: "Delivery time depends on your location. The estimated time will be shown in the modal when requesting one."
  },
  {
    question: "Are there fees for creating or deleting GO Cards?",
    answer: "Some actions may have small service fees. The app will always display charges before confirming."
  },
  {
    question: "What should I do if I suspect unauthorized transactions?",
    answer: "Immediately freeze the card from the card details page and contact GTBank support."
  },
  {
    question: "Can I move money back from a GO Card to my main account?",
    answer: "Yes. Simply use the \"Withdraw from Card\" or \"Move to Account\" option."
  },
  {
    question: "Why didn't I receive my OTP?",
    answer: "Check your network, ensure your phone number is correct, or use \"Resend OTP\" after the countdown."
  },
  {
    question: "Can I use GO Cards for subscriptions like Netflix or Apple Music?",
    answer: "Yes, GO Cards work perfectly for recurring subscription payments."
  }
];

export default function FAQsModal({ open, onOpenChange }: FAQsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto bg-white border-0 rounded-2xl shadow-xl">
        <DialogHeader className="pb-4 border-b border-gray-100">
          <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#F36F21] rounded-full"></span>
            Frequently Asked Questions
          </DialogTitle>
        </DialogHeader>
        
        <Accordion type="single" collapsible className="w-full space-y-2 pt-2">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-100 rounded-xl px-4 bg-[#FAFAFA] data-[state=open]:bg-white data-[state=open]:border-[#F36F21]/30 data-[state=open]:shadow-sm transition-all duration-200"
            >
              <AccordionTrigger className="text-left text-sm font-medium text-gray-800 hover:text-[#F36F21] hover:no-underline py-4 [&[data-state=open]]:text-[#F36F21]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 pb-4 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="pt-4 border-t border-gray-100 mt-2">
          <p className="text-xs text-gray-500 text-center">
            Need more help? Contact GTBank support at <span className="text-[#F36F21] font-medium">0700-482-6999</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
