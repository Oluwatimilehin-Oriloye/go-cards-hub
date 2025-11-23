import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, CheckCircle, Loader2 } from "lucide-react";

interface CreateCardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateCardModal = ({ open, onOpenChange }: CreateCardModalProps) => {
  const [step, setStep] = useState<"confirm" | "processing" | "success">("confirm");

  const handleCreate = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
    }, 2000);
  };

  const handleClose = () => {
    setStep("confirm");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === "confirm" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Create Virtual Card</DialogTitle>
              <DialogDescription>
                Create a new virtual card for online transactions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="bg-muted p-6 rounded-lg text-center space-y-2">
                <CreditCard className="w-12 h-12 mx-auto text-primary" />
                <div className="text-lg font-semibold">Creation Fee</div>
                <div className="text-3xl font-bold text-primary">₦2,000</div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Instant card creation</p>
                <p>✓ Use for online payments worldwide</p>
                <p>✓ Freeze or delete anytime</p>
              </div>
              <Button
                onClick={handleCreate}
                className="w-full bg-gradient-orange hover:opacity-90"
                size="lg"
              >
                Create Card
              </Button>
            </div>
          </>
        )}

        {step === "processing" && (
          <div className="py-12 text-center space-y-4">
            <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" />
            <div className="text-xl font-semibold">Debiting from account...</div>
            <div className="text-muted-foreground">Please wait</div>
          </div>
        )}

        {step === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">Success!</DialogTitle>
            </DialogHeader>
            <div className="py-8 text-center space-y-6">
              <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
              <div className="space-y-2">
                <div className="text-xl font-semibold">Card Created Successfully</div>
                <div className="text-muted-foreground">
                  Your new virtual card is ready to use
                </div>
              </div>
              <Button
                onClick={handleClose}
                className="w-full bg-gradient-orange hover:opacity-90"
                size="lg"
              >
                See Card
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
