import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PayBillsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "details" | "otp" | "success";

export function PayBillsModal({ isOpen, onClose }: PayBillsModalProps) {
  const [step, setStep] = useState<Step>("details");
  const [selectedCard, setSelectedCard] = useState("");
  const [billType, setBillType] = useState("");
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");

  const cards = [
    { id: "temu-card", name: "Temu Card" },
    { id: "jumia-card", name: "Jumia Card" },
    { id: "konga-card", name: "Konga Card" },
  ];

  const billTypes = [
    { id: "phcn", name: "PHCN (Electricity)" },
    { id: "dstv", name: "DSTV / GOTV" },
    { id: "water", name: "Water" },
    { id: "waste", name: "Waste Management" },
    { id: "internet", name: "Internet" },
    { id: "airtime", name: "Airtime" },
    { id: "data", name: "Data Bundle" },
  ];

  const handleContinue = () => {
    if (!selectedCard || !billType || !amount) {
      toast.error("Please fill in all fields");
      return;
    }
    setStep("otp");
  };

  const handleVerifyOtp = () => {
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
      setBillType("");
      setAmount("");
      setOtp("");
    }, 300);
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  const getBillTypeName = () => {
    return billTypes.find(b => b.id === billType)?.name || "Bill";
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {step === "details" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Pay Bills</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Pay for internet, cable and utility bills
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

              <div className="space-y-2">
                <Label htmlFor="billType">Select Bill Type</Label>
                <Select value={billType} onValueChange={setBillType}>
                  <SelectTrigger id="billType">
                    <SelectValue placeholder="Choose bill type" />
                  </SelectTrigger>
                  <SelectContent>
                    {billTypes.map((bill) => (
                      <SelectItem key={bill.id} value={bill.id}>
                        {bill.name}
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
              <Button onClick={handleVerifyOtp} className="bg-primary hover:bg-primary/90">
                Verify & Pay
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
                  Bill Payment Successful
                </DialogTitle>
                <DialogDescription className="text-center">
                  Your {getBillTypeName()} payment of ₦{amount} was completed successfully
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
