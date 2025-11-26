import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, MapPin, Home, Loader2, CheckCircle2 } from "lucide-react";

interface RequestPhysicalCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "delivery" | "processing" | "success";

export const RequestPhysicalCardModal = ({
  isOpen,
  onClose,
}: RequestPhysicalCardModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("delivery");
  const [deliveryOption, setDeliveryOption] = useState<string>("branch");

  const handleSubmit = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
    }, 2000);
  };

  const handleTrackOrder = () => {
    navigate("/notifications");
    handleClose();
  };

  const handleClose = () => {
    setStep("delivery");
    setDeliveryOption("branch");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === "delivery" && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-xl">Request Physical Card</DialogTitle>
                  <DialogDescription>
                    Choose your preferred delivery option
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
                <div className="flex items-start space-x-3 border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="branch" id="branch" className="mt-1" />
                  <Label htmlFor="branch" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-foreground">
                        Nearest GTBank Branch
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Pick up from your closest branch
                    </p>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-muted-foreground">
                        <strong>Delivery Fee:</strong> Free
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong>Timeline:</strong> 3-5 business days
                      </p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-start space-x-3 border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="home" id="home" className="mt-1" />
                  <Label htmlFor="home" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <Home className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-foreground">
                        Deliver to My House
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Card will be delivered to your registered address
                    </p>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-muted-foreground">
                        <strong>Delivery Fee:</strong> ₦1,500
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong>Timeline:</strong> 5-7 business days
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-primary text-primary-foreground hover:bg-orange-dark"
            >
              Submit Request
            </Button>
          </>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <p className="text-lg font-semibold text-foreground">
              Processing your request...
            </p>
            <p className="text-sm text-muted-foreground">Please wait a moment</p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Request Submitted!</h2>
            <p className="text-muted-foreground text-center">
              Your physical card request has been received. You can track your order
              in the Notifications page.
            </p>
            <Button
              onClick={handleTrackOrder}
              className="w-full bg-primary text-primary-foreground hover:bg-orange-dark"
            >
              Track My Order
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
