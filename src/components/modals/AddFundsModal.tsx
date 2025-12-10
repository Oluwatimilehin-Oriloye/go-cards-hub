import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  getAccountSummary,
  AccountSummaryData,
} from "@/services/accountService";

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddFundsModal({ isOpen, onClose }: AddFundsModalProps) {
  const [account, setAccount] = useState<AccountSummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch account details when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getAccountSummary();
        setAccount(data);
      } catch (error) {
        console.error("Error fetching account details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            My Account Details
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            View your main account information
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <p className="text-center py-6">Loading...</p>
        ) : !account ? (
          <p className="text-center py-6 text-red-500">
            Failed to load account details.
          </p>
        ) : (
          <div className="space-y-6 py-4">
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              {/* ACCOUNT NAME */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Account Name
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {account.accountName}
                </p>
              </div>

              {/* ACCOUNT NUMBER */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Account Number
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {String(account.accountNumber)}
                </p>
              </div>

              {/* ACCOUNT TYPE */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Account Type
                </p>
                <p className="text-sm text-foreground">{account.accountType}</p>
              </div>

              {/* STATUS */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Status
                </p>
                <p className="text-sm text-foreground capitalize">
                  {account.status}
                </p>
              </div>

              {/* BALANCE */}
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Available Balance
                </p>
                <p className="text-xl font-bold text-primary">
                  ₦{account.accountBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
