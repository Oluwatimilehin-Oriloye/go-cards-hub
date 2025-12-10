// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { CreditCard, X } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";
// import { useTranslation } from "react-i18next";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// interface ManagePlatformModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   platformName: string;
//   linkedCards?: Array<{ id: string; name: string; lastFour: string }>;
// }

// export function ManagePlatformModal({ 
//   isOpen, 
//   onClose, 
//   platformName,
//   linkedCards = []
// }: ManagePlatformModalProps) {
//   const { t } = useTranslation();
//   const [showUnlinkDialog, setShowUnlinkDialog] = useState(false);
//   const [selectedCard, setSelectedCard] = useState<{ id: string; name: string } | null>(null);

//   const handleUnlinkClick = (card: { id: string; name: string }) => {
//     setSelectedCard(card);
//     setShowUnlinkDialog(true);
//   };

//   const handleConfirmUnlink = () => {
//     if (selectedCard) {
//       toast.success(t('payments.cardUnlinked', { platform: platformName }));
//       setShowUnlinkDialog(false);
//       setSelectedCard(null);
//     }
//   };

//   return (
//     <>
//       <Dialog open={isOpen} onOpenChange={onClose}>
//         <DialogContent className="sm:max-w-[500px]">
//           <DialogHeader>
//             <DialogTitle className="text-2xl font-bold">
//               {t('payments.managePlatform', { platform: platformName })}
//             </DialogTitle>
//             <DialogDescription>
//               {t('payments.linkedCards', { platform: platformName })}
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-4 py-4">
//             {linkedCards.length === 0 ? (
//               <div className="text-center py-8">
//                 <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
//                 <p className="text-muted-foreground">
//                   {t('payments.noLinkedCards')}
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {linkedCards.map((card) => (
//                   <Card key={card.id} className="p-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
//                           <CreditCard className="h-5 w-5 text-primary" />
//                         </div>
//                         <div>
//                           <p className="font-semibold text-foreground">{card.name}</p>
//                           <p className="text-sm text-muted-foreground">
//                             **** **** **** {card.lastFour}
//                           </p>
//                         </div>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleUnlinkClick({ id: card.id, name: card.name })}
//                         className="text-destructive hover:text-destructive hover:bg-destructive/10"
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Unlink Confirmation Dialog */}
//       <AlertDialog open={showUnlinkDialog} onOpenChange={setShowUnlinkDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>
//               {t('payments.unlinkCard')}
//             </AlertDialogTitle>
//             <AlertDialogDescription>
//               {t('payments.unlinkConfirm', { 
//                 card: selectedCard?.name || '', 
//                 platform: platformName 
//               })}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
//             <AlertDialogAction 
//               onClick={handleConfirmUnlink}
//               className="bg-destructive hover:bg-destructive/90"
//             >
//               {t('payments.unlinkCard')}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// }
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ManagePlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  platformName: string;
  linkedCards?: Array<{ id: string; name: string; lastFour: string }>;
  onUnlink?: (cardId: string) => void; // <-- NEW
}

export function ManagePlatformModal({ 
  isOpen, 
  onClose, 
  platformName,
  linkedCards = [],
  onUnlink
}: ManagePlatformModalProps) {
  const { t } = useTranslation();
  const [showUnlinkDialog, setShowUnlinkDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState<{ id: string; name: string } | null>(null);

  const handleUnlinkClick = (card: { id: string; name: string }) => {
    setSelectedCard(card);
    setShowUnlinkDialog(true);
  };

  const handleConfirmUnlink = () => {
    if (selectedCard) {
      toast.success(t('payments.cardUnlinked', { platform: platformName }));

      if (onUnlink) {
        onUnlink(selectedCard.id);   // <-- NEW
      }

      setShowUnlinkDialog(false);
      setSelectedCard(null);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {t('payments.managePlatform', { platform: platformName })}
            </DialogTitle>
            <DialogDescription>
              {t('payments.linkedCards', { platform: platformName })}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {linkedCards.length === 0 ? (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  {t('payments.noLinkedCards')}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {linkedCards.map((card) => (
                  <Card key={card.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{card.name}</p>
                          <p className="text-sm text-muted-foreground">
                            **** **** **** {card.lastFour}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUnlinkClick({ id: card.id, name: card.name })}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showUnlinkDialog} onOpenChange={setShowUnlinkDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t('payments.unlinkCard')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t('payments.unlinkConfirm', { 
                card: selectedCard?.name || '', 
                platform: platformName 
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmUnlink}
              className="bg-destructive hover:bg-destructive/90"
            >
              {t('payments.unlinkCard')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
