import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreateVirtualCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCardCount: number;
  maxCards: number;
}

type Step = "create" | "processing" | "success";

export function CreateVirtualCardModal({ isOpen, onClose, currentCardCount, maxCards }: CreateVirtualCardModalProps) {
  const [step, setStep] = useState<Step>("create");
  const navigate = useNavigate();
  const isLimitReached = currentCardCount >= maxCards;
  const cardCreationFee = 2000;

  const handleCreateCard = () => {
    if (isLimitReached) return;
    
    setStep("processing");
    
    // Simulate API call
    setTimeout(() => {
      setStep("success");
    }, 2000);
  };

  const handleSeeCard = () => {
    navigate("/cards");
    onClose();
    resetModal();
  };

  const resetModal = () => {
    setTimeout(() => setStep("create"), 300);
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {step === "create" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Create Virtual Card — ₦{cardCreationFee.toLocaleString()}</DialogTitle>
              <DialogDescription className="text-muted-foreground space-y-2">
                <p>Creating a virtual card costs ₦{cardCreationFee.toLocaleString()}.</p>
                <p>You can create up to {maxCards} virtual cards maximum.</p>
                {isLimitReached && (
                  <p className="text-destructive font-medium">
                    You've reached the maximum limit of {maxCards} cards.
                  </p>
                )}
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              {!isLimitReached && (
                <Button onClick={handleCreateCard} className="bg-primary hover:bg-primary/90">
                  Create Card (₦{cardCreationFee.toLocaleString()})
                </Button>
              )}
            </DialogFooter>
          </>
        )}

        {step === "processing" && (
          <div className="py-8 flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-semibold text-foreground">Debiting from account…</p>
          </div>
        )}

        {step === "success" && (
          <>
            <DialogHeader>
              <div className="flex flex-col items-center gap-4 py-4">
                <CheckCircle2 className="h-16 w-16 text-primary" />
                <DialogTitle className="text-2xl font-bold text-center">
                  Virtual Card Created Successfully 🎉
                </DialogTitle>
              </div>
            </DialogHeader>

            <DialogFooter>
              <Button onClick={handleSeeCard} className="w-full bg-primary hover:bg-primary/90">
                See Card
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
