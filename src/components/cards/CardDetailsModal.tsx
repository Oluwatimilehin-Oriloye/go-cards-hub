import { Copy, Eye, EyeOff, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VirtualCardDisplay } from "./VirtualCardDisplay";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getCardDetails, CardDetails } from "@/services/cardService";

interface CardDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cardId: string;
  cardName: string;
  balance: number;
}

export function CardDetailsModal({
  open,
  onOpenChange,
  cardId,
  cardName,
  balance,
}: CardDetailsModalProps) {
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [onlinePaymentsEnabled, setOnlinePaymentsEnabled] = useState(true);
  const [internationalPaymentsEnabled, setInternationalPaymentsEnabled] =
    useState(false);
  const [cardDetails, setCardDetails] = useState<CardDetails | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch full card details when modal opens
  useEffect(() => {
    if (open && cardId) {
      fetchCardDetails();
    }
  }, [open, cardId]);

  const fetchCardDetails = async () => {
    try {
      setLoading(true);
      const details = await getCardDetails(cardId);
      setCardDetails(details);
    } catch (error) {
      console.error("Failed to load card details:", error);
      toast.error("Failed to load card details");
    } finally {
      setLoading(false);
    }
  };

  if (!cardDetails && loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading card details...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!cardDetails) return null;

  const fullCardNumber = cardDetails.cardNumber.replace(
    /(\d{4})(?=\d)/g,
    "$1 "
  );
  const cvv = cardDetails.cvv;
  const expiryDate = cardDetails.expiryDate;
  const lastFour = cardDetails.cardNumber.slice(-4);
  const cardType = cardDetails.type === "virtual" ? "Visa" : "Mastercard";
  const holderName = "Timi Adebayo"; // This should come from user info in production

  const handleCopyCardNumber = () => {
    navigator.clipboard.writeText(cardDetails.cardNumber);
    toast.success("Card number copied to clipboard");
  };

  const handleCopyCVV = () => {
    navigator.clipboard.writeText(cvv);
    toast.success("CVV copied to clipboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Card Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Card Display */}
          <div className="flex justify-center -mx-6">
            <VirtualCardDisplay
              name={cardName}
              balance={`₦${balance.toLocaleString()}`}
              lastFour={lastFour}
              cardType={cardType as "Mastercard" | "Verve" | "Visa"}
            />
          </div>

          {/* Basic Info */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Card Holder</span>
              <span className="font-medium">{holderName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                GO Card Name
              </span>
              <span className="font-medium">{cardName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Card Type</span>
              <span className="font-medium">{cardType}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Balance</span>
              <span className="font-bold text-primary">
                ₦{balance.toLocaleString()}
              </span>
            </div>
          </div>

          <Separator />

          {/* Card Information */}
          <div className="space-y-4">
            {/* Card Number */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Card Number
              </Label>
              <div className="flex items-center gap-2">
                <div className="flex-1 font-mono text-lg">
                  {showFullNumber
                    ? fullCardNumber
                    : `•••• •••• •••• ${lastFour}`}
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowFullNumber(!showFullNumber)}
                >
                  {showFullNumber ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleCopyCardNumber}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* CVV */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  CVV
                </Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 font-mono text-lg">
                    {showCVV ? cvv : "•••"}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setShowCVV(!showCVV)}
                  >
                    {showCVV ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button size="icon" variant="ghost" onClick={handleCopyCVV}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Expiry Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Expiry Date
                </Label>
                <div className="font-mono text-lg">{expiryDate}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Card Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <h3 className="font-semibold">Card Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="online-payments" className="font-medium">
                    Online Payments
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow this card to be used for online transactions
                  </p>
                </div>
                <Switch
                  id="online-payments"
                  checked={onlinePaymentsEnabled}
                  onCheckedChange={setOnlinePaymentsEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="international-payments"
                    className="font-medium"
                  >
                    International Payments
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable transactions outside Nigeria
                  </p>
                </div>
                <Switch
                  id="international-payments"
                  checked={internationalPaymentsEnabled}
                  onCheckedChange={setInternationalPaymentsEnabled}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
