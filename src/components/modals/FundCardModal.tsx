/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { fundCard } from "@/services/cardService";

interface FundCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardId: string;
  cardName: string;
  onFundSuccess: () => void;
}

type Step = "details" | "confirm" | "success";

export function FundCardModal({
  isOpen,
  onClose,
  cardId,
  cardName,
  onFundSuccess,
}: FundCardModalProps) {
  const [step, setStep] = useState<Step>("details");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock linked account - in production, fetch from user data
  const linkedAccount = {
    name: "Adebayo Olusegun",
    accountNumber: "0123456789",
    bank: "GTBank",
    balance: 150000,
  };

  const handleContinue = () => {
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }
    const amountNum = parseFloat(amount);
    if (amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (amountNum > linkedAccount.balance) {
      toast.error("Insufficient balance in linked account");
      return;
    }
    setStep("confirm");
  };

  const handleConfirm = async () => {
    if (!pin) {
      toast.error("Please enter your PIN");
      return;
    }

    if (pin.length !== 4) {
      toast.error("PIN must be 4 digits");
      return;
    }

    try {
      setLoading(true);
      await fundCard(cardId, {
        amount: parseFloat(amount),
        pin: pin,
      });
      setStep("success");
    } catch (error: any) {
      console.error("Failed to fund card:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to fund card";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDone = () => {
    onFundSuccess(); // Refresh cards
    onClose();
    resetModal();
  };

  const resetModal = () => {
    setTimeout(() => {
      setStep("details");
      setAmount("");
      setPin("");
    }, 300);
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {step === "details" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Fund Card
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Add funds to {cardName}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Linked Bank Account
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {linkedAccount.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {linkedAccount.bank} • {linkedAccount.accountNumber}
                  </p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Available Balance
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    ₦{linkedAccount.balance.toLocaleString()}
                  </p>
                </div>
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
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        ) : step === "confirm" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Confirm Transaction
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Please review and confirm the details below
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">From</span>
                  <span className="text-sm font-medium text-foreground">
                    {linkedAccount.bank}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">To</span>
                  <span className="text-sm font-medium text-foreground">
                    {cardName}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="text-sm font-semibold text-foreground">
                    Amount
                  </span>
                  <span className="text-xl font-bold text-primary">
                    ₦{parseFloat(amount).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pin">Transaction PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Enter 4-digit PIN"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                />
              </div>

              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">
                    ₦{parseFloat(amount).toLocaleString()}
                  </span>{" "}
                  will be debited from your {linkedAccount.bank} account and
                  credited to {cardName}.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("details")}>
                Back
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={loading}
                className="bg-primary hover:bg-primary/90"
              >
                {loading ? "Processing..." : "Confirm & Fund"}
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
                  ₦{parseFloat(amount).toLocaleString()} has been added to{" "}
                  {cardName}
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
