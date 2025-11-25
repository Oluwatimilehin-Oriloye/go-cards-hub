import { Send, Wallet, FileText, CreditCard, Receipt } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { CreateVirtualCardModal } from "@/components/modals/CreateVirtualCardModal";
import { SendMoneyModal } from "@/components/modals/SendMoneyModal";
import { FundCardModal } from "@/components/modals/FundCardModal";
import { RequestStatementModal } from "@/components/modals/RequestStatementModal";
import { PayBillsModal } from "@/components/modals/PayBillsModal";

const actions = [
  {
    icon: Send,
    title: "Send Money From Any Card",
    description: "Send money to 80+ countries instantly",
    action: "send",
  },
  {
    icon: Wallet,
    title: "Fund",
    description: "Add funds to your account",
    action: "fund",
  },
  {
    icon: FileText,
    title: "Request Statement",
    description: "Download transaction history",
    action: "statement",
  },
  {
    icon: CreditCard,
    title: "Virtual Card",
    description: "Create and manage cards",
    action: "card",
  },
  {
    icon: Receipt,
    title: "Pay Bills",
    description: "Pay for internet, cable and utility bills",
    action: "bills",
  },
];

export function QuickActions() {
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [showSendMoneyModal, setShowSendMoneyModal] = useState(false);
  const [showFundCardModal, setShowFundCardModal] = useState(false);
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [showPayBillsModal, setShowPayBillsModal] = useState(false);

  const handleActionClick = (actionType: string) => {
    switch (actionType) {
      case "send":
        setShowSendMoneyModal(true);
        break;
      case "fund":
        setShowFundCardModal(true);
        break;
      case "statement":
        setShowStatementModal(true);
        break;
      case "card":
        setShowCreateCardModal(true);
        break;
      case "bills":
        setShowPayBillsModal(true);
        break;
    }
  };

  const MAX_CARDS = 3;
  const currentCardCount = 3; // Mock data

  return (
    <>
      <section>
        <h2 className="mb-4 text-xl font-semibold text-foreground">Quick Actions</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {actions.map((action) => (
            <Card
              key={action.title}
              onClick={() => handleActionClick(action.action)}
              className="group cursor-pointer border border-border bg-secondary p-6 transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary"
            >
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <action.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-foreground">{action.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{action.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Modals */}
      <CreateVirtualCardModal
        isOpen={showCreateCardModal}
        onClose={() => setShowCreateCardModal(false)}
        currentCardCount={currentCardCount}
        maxCards={MAX_CARDS}
      />

      <SendMoneyModal
        isOpen={showSendMoneyModal}
        onClose={() => setShowSendMoneyModal(false)}
      />

      <FundCardModal
        isOpen={showFundCardModal}
        onClose={() => setShowFundCardModal(false)}
      />

      <RequestStatementModal
        isOpen={showStatementModal}
        onClose={() => setShowStatementModal(false)}
      />

      <PayBillsModal
        isOpen={showPayBillsModal}
        onClose={() => setShowPayBillsModal(false)}
      />
    </>
  );
}
