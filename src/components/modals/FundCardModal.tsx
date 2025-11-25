import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FundCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardName?: string;
}

type Step = "details" | "success";

export function FundCardModal({ isOpen, onClose, cardName }: FundCardModalProps) {
  const [step, setStep] = useState<Step>("details");
  const [selectedCard, setSelectedCard] = useState("");
  const [amount, setAmount] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const cards = [
    { id: "temu-card", name: "Temu Card" },
    { id: "jumia-card", name: "Jumia Card" },
    { id: "konga-card", name: "Konga Card" },
  ];

  const accountName = "GoCard - Adebayo Olusegun";

  const handleFund = () => {
    if (!selectedCard || !amount) {
      toast.error("Please fill in all fields");
      return;
    }
    setStep("success");
  };

  const handleDone = () => {
    onClose();
    resetModal();
  };

  const resetModal = () => {
    setTimeout(() => {
      setStep("details");
      setSelectedCard("");
      setAmount("");
    }, 300);
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {step === "details" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Fund Card</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Add funds to your virtual card
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="card">Select Card</Label>
                <Select value={selectedCard} onValueChange={setSelectedCard}>
                  <SelectTrigger id="card">
                    <SelectValue placeholder="Choose a card" />
                  </SelectTrigger>
                  <SelectContent>
                    {cards.map((card) => (
                      <SelectItem key={card.id} value={card.id}>
                        {card.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCard && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Account Name:</p>
                  <p className="text-lg font-semibold text-foreground">{accountName}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₦)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleFund} className="bg-primary hover:bg-primary/90">
                Fund Card
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex flex-col items-center gap-4 py-4">
                <CheckCircle2 className="h-16 w-16 text-primary" />
                <DialogTitle className="text-2xl font-bold text-center">
                  Card Funded Successfully
                </DialogTitle>
                <DialogDescription className="text-center">
                  Your card has been credited with ₦{amount}
                </DialogDescription>
              </div>
            </DialogHeader>

            <DialogFooter>
              <Button onClick={handleDone} className="w-full bg-primary hover:bg-primary/90">
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
