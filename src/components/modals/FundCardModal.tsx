import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FundCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardName?: string;
}

export function FundCardModal({ isOpen, onClose, cardName }: FundCardModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const bankDetails = {
    accountNumber: "0123456789",
    bankName: "Guaranty Trust Bank (GTBank)",
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied to clipboard`);
    
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Fund Card</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Transfer to this account to fund {cardName || "your card"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-6">
          {/* Account Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Account Number</label>
            <div className="flex items-center gap-2 p-4 bg-muted rounded-lg border border-border">
              <span className="flex-1 text-lg font-semibold text-foreground">
                {bankDetails.accountNumber}
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleCopy(bankDetails.accountNumber, "Account Number")}
                className="h-8 w-8"
              >
                {copiedField === "Account Number" ? (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Bank Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Bank Name</label>
            <div className="flex items-center gap-2 p-4 bg-muted rounded-lg border border-border">
              <span className="flex-1 text-lg font-semibold text-foreground">
                {bankDetails.bankName}
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleCopy(bankDetails.bankName, "Bank Name")}
                className="h-8 w-8"
              >
                {copiedField === "Bank Name" ? (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-foreground">
              Transfer funds to the account above and your card will be credited automatically.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-primary hover:bg-primary/90">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
