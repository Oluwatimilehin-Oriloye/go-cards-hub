/* eslint-disable @typescript-eslint/no-empty-object-type */
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
import { getMyCards, sendMoney } from "@/services/cardService";
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
  status: string;
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

      // FIX: only show active cards
      const activeCards = data.filter((card) => card.status === "active");

      setCards(activeCards);
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

    // Pool of sample names
    const sampleNames = [
      "Adebayo Olusegun",
      "Ngozi Chukwu",
      "Kemi Adeola",
      "Tunde Bakare",
      "Ibrahim Musa",
      "Funmilayo Adetutu",
      "Samuel Okoro",
      "Chidera Nwosu",
      "Blessing Ekanem",
      "Opeyemi Adeniran",
      "Halima Sadiq",
      "Femi Akinwande",
      "Adaobi Mba",
      "Rotimi Alade",
      "Zainab Umar"
    ];

    // Utility to fetch a random name
    function getRandomName() {
      const index = Math.floor(Math.random() * sampleNames.length);
      return sampleNames[index];
    }

    // Usage
    setRecipientName(getRandomName());


    setStep("otp");
  };

  const handleInitiateTransaction = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      // REAL send money API call
      await sendMoney({
        cardId: selectedCard,
        amount: parseFloat(amount),
        bankName,
        accountNumber,
        recipientName,
        otp,
      });

      toast.success("Money sent successfully!");
      setStep("success");

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Send money failed:", error);
      toast.error(
        error.response?.data?.message || "Transaction failed. Try again."
      );
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
        {/* DETAILS STEP */}
        {step === "details" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Send Money
              </DialogTitle>
              <DialogDescription>
                Transfer money from your virtual card
              </DialogDescription>
            </DialogHeader>

            {userProfile && (
              <div className="bg-muted/50 p-3 rounded-lg mb-4">
                <p className="text-xs text-muted-foreground">Sending as:</p>
                <p className="font-semibold">
                  {userProfile.firstName} {userProfile.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {userProfile.accountNumber}
                </p>
              </div>
            )}

            <div className="space-y-4">
              {/* CARD SELECTION */}
              <div className="space-y-2">
                <Label>Select Card to Debit</Label>

                {cardsLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                ) : (
                  <Select value={selectedCard} onValueChange={setSelectedCard}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a card" />
                    </SelectTrigger>
                    <SelectContent>
                      {cards.length === 0 ? (
                        <SelectItem value="none" disabled>
                          No active cards
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

              {/* AMOUNT */}
              <div className="space-y-2">
                <Label>Amount (₦)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              {/* BANK NAME */}
              <div className="space-y-2">
                <Label>Bank Name</Label>
                <Input
                  type="text"
                  placeholder="GTBank, Access Bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>

              {/* ACCOUNT NUMBER */}
              <div className="space-y-2">
                <Label>Recipient Account Number</Label>
                <Input
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
              <Button className="bg-primary" onClick={handleContinue}>
                Continue
              </Button>
            </DialogFooter>
          </>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Enter OTP</DialogTitle>
              <DialogDescription>
                Enter the 6-digit code sent to your phone
              </DialogDescription>
            </DialogHeader>

            <div className="bg-muted/40 p-3 rounded-lg mb-4">
              <p className="text-sm text-muted-foreground">Recipient Name</p>
              <p className="font-semibold">{recipientName}</p>
            </div>

            <div className="space-y-2">

              
            <Label>OTP Code</Label>
            <Input
              type="password"
              maxLength={6}
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="text-center text-2xl tracking-widest"
            />
          </div>


            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("details")}>
                Back
              </Button>
              <Button
                className="bg-primary"
                disabled={loading}
                onClick={handleInitiateTransaction}
              >
                {loading ? "Processing..." : "Initiate Transaction"}
              </Button>
            </DialogFooter>
          </>
        )}

        {/* SUCCESS STEP */}
        {step === "success" && (
          <>
            <DialogHeader className="flex flex-col items-center py-6">
              <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
              <DialogTitle className="text-2xl font-bold text-center">
                Transaction Successful
              </DialogTitle>
              <DialogDescription className="text-center">
                Your transfer of ₦{parseFloat(amount).toLocaleString()} was
                successful.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button className="w-full bg-primary" onClick={handleDone}>
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
