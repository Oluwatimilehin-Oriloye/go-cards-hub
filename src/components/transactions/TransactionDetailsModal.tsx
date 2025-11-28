// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { useTranslation } from "react-i18next";

// interface TransactionDetailsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   transaction: {
//     id: string;
//     amount: number;
//     type: "inflow" | "outflow";
//     description: string;
//     date: string;
//     time: string;
//     status: "completed" | "pending" | "failed";
//     cardName: string;
//     cardLastFour: string;
//     merchantName?: string;
//     merchantCategory?: string;
//     referenceNumber: string;
//     fees?: number;
//   };
// }

// export function TransactionDetailsModal({ isOpen, onClose, transaction }: TransactionDetailsModalProps) {
//   const { t } = useTranslation();

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-500/10 text-green-600 border-green-500/20";
//       case "pending":
//         return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
//       case "failed":
//         return "bg-red-500/10 text-red-600 border-red-500/20";
//       default:
//         return "bg-muted text-muted-foreground";
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">{t('transactions.transactionDetails')}</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-6 py-4">
//           {/* Amount and Type */}
//           <div className="text-center space-y-2">
//             <p className="text-4xl font-bold text-foreground">
//               {t('common.currency')}{transaction.amount.toLocaleString()}
//             </p>
//             <Badge 
//               variant="outline" 
//               className={transaction.type === "inflow" ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-red-500/10 text-red-600 border-red-500/20"}
//             >
//               {transaction.type === "inflow" ? t('transactions.inflow') : t('transactions.outflow')}
//             </Badge>
//           </div>

//           <Separator />

//           {/* Transaction Details Grid */}
//           <div className="space-y-4">
//             <DetailRow label={t('transactions.transactionId')} value={transaction.id} />
//             <DetailRow 
//               label={t('transactions.dateTime')} 
//               value={`${transaction.date} at ${transaction.time}`} 
//             />
//             <DetailRow 
//               label={t('transactions.status')} 
//               value={
//                 <Badge variant="outline" className={getStatusColor(transaction.status)}>
//                   {t(`transactions.${transaction.status}`)}
//                 </Badge>
//               } 
//             />
//             <DetailRow 
//               label={t('transactions.cardUsed')} 
//               value={`${transaction.cardName} (****${transaction.cardLastFour})`} 
//             />
            
//             {transaction.merchantName && (
//               <DetailRow label={t('transactions.merchantName')} value={transaction.merchantName} />
//             )}
            
//             {transaction.merchantCategory && (
//               <DetailRow label={t('transactions.merchantCategory')} value={transaction.merchantCategory} />
//             )}
            
//             <DetailRow label={t('transactions.referenceNumber')} value={transaction.referenceNumber} />
            
//             {transaction.fees !== undefined && transaction.fees > 0 && (
//               <DetailRow 
//                 label={t('transactions.fees')} 
//                 value={`${t('common.currency')}${transaction.fees.toLocaleString()}`} 
//               />
//             )}
            
//             <DetailRow label={t('transactions.description')} value={transaction.description} />
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
//   return (
//     <div className="flex justify-between items-start gap-4">
//       <span className="text-sm text-muted-foreground font-medium">{label}</span>
//       <span className="text-sm text-foreground font-semibold text-right flex-1">
//         {value}
//       </span>
//     </div>
//   );
// }


import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: {
    id: string;
    amount: number;
    type: "inflow" | "outflow";
    description: string;
    date: string;
    time: string;
    status: "completed" | "pending" | "failed";
    cardName: string;
    cardLastFour: string;
    merchantName?: string;
    merchantCategory?: string;
    referenceNumber: string;
    fees?: number;
  } | null;
}

export function TransactionDetailsModal({ isOpen, onClose, transaction }: TransactionDetailsModalProps) {
  const { t } = useTranslation();

  // Don't render if no transaction
  if (!transaction) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "failed":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t('transactions.transactionDetails')}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Amount and Type */}
          <div className="text-center space-y-2">
            <p className="text-4xl font-bold text-foreground">
              {t('common.currency')}{transaction.amount.toLocaleString()}
            </p>
            <Badge 
              variant="outline" 
              className={transaction.type === "inflow" ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-red-500/10 text-red-600 border-red-500/20"}
            >
              {transaction.type === "inflow" ? t('transactions.inflow') : t('transactions.outflow')}
            </Badge>
          </div>

          <Separator />

          {/* Transaction Details Grid */}
          <div className="space-y-4">
            <DetailRow label={t('transactions.transactionId')} value={transaction.id} />
            <DetailRow 
              label={t('transactions.dateTime')} 
              value={`${transaction.date} at ${transaction.time}`} 
            />
            <DetailRow 
              label={t('transactions.status')} 
              value={
                <Badge variant="outline" className={getStatusColor(transaction.status)}>
                  {t(`transactions.${transaction.status}`)}
                </Badge>
              } 
            />
            <DetailRow 
              label={t('transactions.cardUsed')} 
              value={`${transaction.cardName} (****${transaction.cardLastFour})`} 
            />
            
            {transaction.merchantName && (
              <DetailRow label={t('transactions.merchantName')} value={transaction.merchantName} />
            )}
            
            {transaction.merchantCategory && (
              <DetailRow label={t('transactions.merchantCategory')} value={transaction.merchantCategory} />
            )}
            
            <DetailRow label={t('transactions.referenceNumber')} value={transaction.referenceNumber} />
            
            {transaction.fees !== undefined && transaction.fees > 0 && (
              <DetailRow 
                label={t('transactions.fees')} 
                value={`${t('common.currency')}${transaction.fees.toLocaleString()}`} 
              />
            )}
            
            <DetailRow label={t('transactions.description')} value={transaction.description} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
      <span className="text-sm text-foreground font-semibold text-right flex-1">
        {value}
      </span>
    </div>
  );
}
