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
import { getProfile } from "@/services/authService";

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Card {
  id: string;
  cardName: string;
  balance: number;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  accountNumber: string;
}

type Step = "details" | "otp" | "success";

export function SendMoneyModal({
  isOpen,
  onClose,
  onSuccess,
}: SendMoneyModalProps) {
  const [step, setStep] = useState<Step>("details");
  const [selectedCard, setSelectedCard] = useState("");
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [otp, setOtp] = useState("");
  const [cards, setCards] = useState<Card[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [cardsLoading, setCardsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchCards();
      fetchUserProfile();
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

  const fetchUserProfile = async () => {
    try {
      const profile = await getProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleContinue = () => {
    if (!selectedCard || !amount || !bankName || !accountNumber) {
      toast.error("Please fill in all fields");
      return;
    }

    const selectedCardData = cards.find((c) => c.id === selectedCard);
    if (selectedCardData && parseFloat(amount) > selectedCardData.balance) {
      toast.error("Insufficient card balance");
      return;
    }

    // Simulate fetching recipient name
    setRecipientName("Adebayo Olusegun");
    setStep("otp");
  };

  const handleInitiateTransaction = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      // TODO: Call your send money API endpoint here
      // await sendMoney({ cardId: selectedCard, amount: parseFloat(amount), bankName, accountNumber, otp });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Money sent successfully!");
      setStep("success");

      // Call the callback if provided
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (error) {
      console.error("Send money failed:", error);
      toast.error(error.response?.data?.message || "Failed to send money");
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
              <DialogTitle className="text-2xl font-bold">
                Send Money
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Transfer money from your virtual card
              </DialogDescription>
            </DialogHeader>

            {userProfile && (
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Sending as:</p>
                <p className="font-semibold text-foreground">
                  {userProfile.firstName} {userProfile.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {userProfile.accountNumber}
                </p>
              </div>
            )}

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="card">Select Card to Debit</Label>
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

            <div className="bg-muted/50 p-4 rounded-lg mb-4">
              <p className="text-sm text-muted-foreground">Recipient Name:</p>
              <p className="text-lg font-semibold text-foreground">
                {recipientName}
              </p>
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
              <Button
                onClick={handleInitiateTransaction}
                className="bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? "Processing..." : "Initiate Transaction"}
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
                  Your transfer of ₦{parseFloat(amount).toLocaleString()} was
                  completed successfully
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
