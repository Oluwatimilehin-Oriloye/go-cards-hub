import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "details" | "otp" | "success";

export function SendMoneyModal({ isOpen, onClose }: SendMoneyModalProps) {
  const [step, setStep] = useState<Step>("details");
  const [selectedCard, setSelectedCard] = useState("");
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [otp, setOtp] = useState("");

  const cards = [
    { id: "temu-card", name: "Temu Card" },
    { id: "jumia-card", name: "Jumia Card" },
    { id: "konga-card", name: "Konga Card" },
  ];

  const handleContinue = () => {
    if (!selectedCard || !amount || !bankName || !accountNumber) {
      toast.error("Please fill in all fields");
      return;
    }
    // Simulate fetching recipient name
    setRecipientName("Adebayo Olusegun");
    setStep("otp");
  };

  const handleInitiateTransaction = () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
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
      setBankName("");
      setAccountNumber("");
      setRecipientName("");
      setOtp("");
    }, 300);
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {step === "details" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Send Money</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Transfer money from your virtual card
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="card">Select Card to Debit</Label>
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

              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  type="text"
                  placeholder="e.g., GTBank, Access Bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="account">Recipient Account Number</Label>
                <Input
                  id="account"
                  type="text"
                  placeholder="0123456789"
                  maxLength={10}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleContinue} className="bg-primary hover:bg-primary/90">
                Continue
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "otp" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Enter OTP</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Enter the 6-digit code sent to your phone
              </DialogDescription>
            </DialogHeader>

            <div className="bg-muted/50 p-4 rounded-lg mb-4">
              <p className="text-sm text-muted-foreground">Recipient Name:</p>
              <p className="text-lg font-semibold text-foreground">{recipientName}</p>
            </div>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="text-center text-2xl tracking-widest"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("details")}>
                Back
              </Button>
              <Button onClick={handleInitiateTransaction} className="bg-primary hover:bg-primary/90">
                Initiate Transaction
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "success" && (
          <>
            <DialogHeader>
              <div className="flex flex-col items-center gap-4 py-4">
                <CheckCircle2 className="h-16 w-16 text-primary" />
                <DialogTitle className="text-2xl font-bold text-center">
                  Transaction Successful
                </DialogTitle>
                <DialogDescription className="text-center">
                  Your transfer of ₦{amount} was completed successfully
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
