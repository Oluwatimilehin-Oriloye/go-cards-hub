import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getMyCards } from "@/services/cardService";

interface PayBillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Card {
  id: string;
  cardName: string;
  balance: number;
}

type Step = "details" | "otp" | "success";

export function PayBillsModal({
  isOpen,
  onClose,
  onSuccess,
}: PayBillsModalProps) {
  const [step, setStep] = useState<Step>("details");
  const [selectedCard, setSelectedCard] = useState("");
  const [billType, setBillType] = useState("");
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [cards, setCards] = useState<Card[]>([]);
  const [cardsLoading, setCardsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const billTypes = [
    { id: "phcn", name: "PHCN (Electricity)" },
    { id: "dstv", name: "DSTV / GOTV" },
    { id: "water", name: "Water" },
    { id: "waste", name: "Waste Management" },
    { id: "internet", name: "Internet" },
    { id: "airtime", name: "Airtime" },
    { id: "data", name: "Data Bundle" },
  ];

  useEffect(() => {
    if (isOpen) {
      fetchCards();
    }
  }, [isOpen]);

  const fetchCards = async () => {
    try {
      setCardsLoading(true);
      const data = await getMyCards();
      setCards(data);
    } catch (error) {
      console.error("Error fetching cards:", error);
      toast.error("Failed to load cards");
    } finally {
      setCardsLoading(false);
    }
  };

  const handleContinue = () => {
    if (!selectedCard || !billType || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    const selectedCardData = cards.find((c) => c.id === selectedCard);
    if (selectedCardData && parseFloat(amount) > selectedCardData.balance) {
      toast.error("Insufficient card balance");
      return;
    }

    setStep("otp");
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      // TODO: Call your pay bills API endpoint here
      // await payBill({ cardId: selectedCard, billType, amount: parseFloat(amount), otp });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Bill payment successful!");
      setStep("success");

      // Call the callback if provided
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (error) {
      console.error("Bill payment failed:", error);
      toast.error(error.response?.data?.message || "Failed to pay bill");
    } finally {
      setLoading(false);
    }
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
    return billTypes.find((b) => b.id === billType)?.name || "Bill";
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {step === "details" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Pay Bills
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Pay for internet, cable and utility bills
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="card">Select Card</Label>
                {cardsLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                ) : (
                  <Select value={selectedCard} onValueChange={setSelectedCard}>
                    <SelectTrigger id="card">
                      <SelectValue placeholder="Choose a card" />
                    </SelectTrigger>
                    <SelectContent>
                      {cards.length === 0 ? (
                        <SelectItem value="no-cards" disabled>
                          No cards available
                        </SelectItem>
                      ) : (
                        cards.map((card) => (
                          <SelectItem key={card.id} value={card.id}>
                            {card.cardName} (₦{card.balance.toLocaleString()})
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                )}
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
              <Button
                onClick={handleContinue}
                className="bg-primary hover:bg-primary/90"
              >
                Continue
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "otp" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Enter OTP
              </DialogTitle>
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
              <Button
                onClick={handleVerifyOtp}
                className="bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? "Processing..." : "Verify & Pay"}
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
                  Your {getBillTypeName()} payment of ₦
                  {parseFloat(amount).toLocaleString()} was completed
                  successfully
                </DialogDescription>
              </div>
            </DialogHeader>

            <DialogFooter>
              <Button
                onClick={handleDone}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
