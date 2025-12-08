import { Info, Plus, Snowflake, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FundCardModal } from "@/components/modals/FundCardModal";
import { FreezeCardModal } from "@/components/modals/FreezeCardModal";
import { DeleteCardModal } from "@/components/modals/DeleteCardModal";
import { CardDetailsModal } from "./CardDetailsModal";
import {
  AccountSummaryData,
  getAccountSummary,
} from "@/services/accountService";

interface CardActionsProps {
  selectedCardId: string;
  cardName: string;
  balance: number;
  status: string; // 'active', 'frozen', 'blocked', 'deleted'
  onFreeze: (duration: string) => void;
  onUnfreeze: () => void;
  onDelete: (reason: string) => void;
  onRefresh: () => void;
}

export function CardActions({
  selectedCardId,
  cardName,
  balance,
  status,
  onFreeze,
  onUnfreeze,
  onDelete,
  onRefresh,
}: CardActionsProps) {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [fundCardModalOpen, setFundCardModalOpen] = useState(false);
  const [freezeModalOpen, setFreezeModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summaryData, setSummaryData] = useState<AccountSummaryData | null>(
    null
  );

  const isFrozen = status === "frozen";

  const handleDetails = () => {
    setDetailsModalOpen(true);
  };

  const handleAddMoney = () => {
    setFundCardModalOpen(true);
  };

  const handleFreezeClick = () => {
    if (isFrozen) {
      onUnfreeze();
    } else {
      setFreezeModalOpen(true);
    }
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  // 🚨 Data Fetching Logic
  const fetchAccountData = async () => {
    try {
      setLoading(true);
      const data = await getAccountSummary();
      setSummaryData(data);
      setError(null);
    } catch (err) {
      console.error("API Fetch Error:", err);
      setError(
        err.message || "Failed to load account data. Please log in again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  return (
    <>
      <CardDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        cardId={selectedCardId}
        cardName={cardName}
        balance={balance}
      />

      <FundCardModal
        isOpen={fundCardModalOpen}
        onClose={() => setFundCardModalOpen(false)}
        cardId={selectedCardId}
        cardName={cardName}
        onFundSuccess={onRefresh}
        summaryData={summaryData}
      />

      <FreezeCardModal
        isOpen={freezeModalOpen}
        onClose={() => setFreezeModalOpen(false)}
        cardName={cardName}
        onFreeze={onFreeze}
      />

      <DeleteCardModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        cardId={selectedCardId}
        cardName={cardName}
        balance={balance}
        onDeleteSuccess={onRefresh}
      />

      <div className="flex justify-center gap-8">
        {/* Details */}
        <div className="flex flex-col items-center gap-2">
          <Button
            onClick={handleDetails}
            size="icon"
            className="h-14 w-14 rounded-full bg-foreground text-background hover:bg-foreground/90"
          >
            <Info className="h-6 w-6" />
          </Button>
          <span className="text-sm font-medium text-foreground">Details</span>
        </div>

        {/* Add Money */}
        <div className="flex flex-col items-center gap-2">
          <Button
            onClick={handleAddMoney}
            size="icon"
            variant="outline"
            className="h-14 w-14 rounded-full border-2"
          >
            <Plus className="h-6 w-6" />
          </Button>
          <span className="text-sm font-medium text-foreground">Add Money</span>
        </div>

        {/* Freeze/Unfreeze */}
        <div className="flex flex-col items-center gap-2">
          <Button
            onClick={handleFreezeClick}
            size="icon"
            variant="outline"
            className={`h-14 w-14 rounded-full border-2 ${
              isFrozen
                ? "bg-blue-500 text-white hover:bg-blue-600 border-blue-500"
                : ""
            }`}
          >
            <Snowflake className="h-6 w-6" />
          </Button>
          <span className="text-sm font-medium text-foreground">
            {isFrozen ? "Unfreeze" : "Freeze"}
          </span>
        </div>

        {/* Delete */}
        <div className="flex flex-col items-center gap-2">
          <Button
            onClick={handleDeleteClick}
            size="icon"
            variant="outline"
            className="h-14 w-14 rounded-full border-2 hover:border-destructive hover:text-destructive"
          >
            <Trash2 className="h-6 w-6" />
          </Button>
          <span className="text-sm font-medium text-foreground">Delete</span>
        </div>
      </div>
    </>
  );
}
