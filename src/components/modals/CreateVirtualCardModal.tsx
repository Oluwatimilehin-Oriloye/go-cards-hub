/* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Loader2, CheckCircle2 } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { createVirtualCard } from "@/services/cardService";

// interface CreateVirtualCardModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   currentCardCount: number;
//   maxCards: number;
// }

// type Step = "create" | "processing" | "success";

// export function CreateVirtualCardModal({
//   isOpen,
//   onClose,
//   currentCardCount,
//   maxCards,
// }: CreateVirtualCardModalProps) {
//   const [step, setStep] = useState<Step>("create");
//   const [cardName, setCardName] = useState("");
//   const navigate = useNavigate();
//   const isLimitReached = currentCardCount >= maxCards;
//   const cardCreationFee = 2000;

//   //  THE ONLY PART WE UPDATED — this now calls your API correctly
//   const handleCreateCard = async () => {
//     if (isLimitReached || !cardName.trim()) return;

//     setStep("processing");

//     try {
//       await createVirtualCard({ cardName }); // ← CALL BACKEND

//       setStep("success"); // ← MOVE TO SUCCESS SCREEN
//     } catch (err: any) {
//       console.error("Card creation failed:", err);

//       alert(
//         err?.response?.data?.message ||
//           err?.response?.data?.error ||
//           "Failed to create virtual card"
//       );

//       setStep("create"); // Reset UI if API fails
//     }
//   };

//   const handleSeeCard = () => {
//     navigate("/cards");
//     onClose();
//     resetModal();
//   };

//   const resetModal = () => {
//     setTimeout(() => {
//       setStep("create");
//       setCardName("");
//     }, 300);
//   };

//   const handleClose = () => {
//     onClose();
//     resetModal();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         {/* CREATE STEP */}
//         {step === "create" && (
//           <>
//             <DialogHeader>
//               <DialogTitle className="text-2xl font-bold">
//                 Create Virtual Card — ₦{cardCreationFee.toLocaleString()}
//               </DialogTitle>
//               <DialogDescription className="text-muted-foreground space-y-2">
//                 <p>
//                   Creating a virtual card costs ₦
//                   {cardCreationFee.toLocaleString()}.
//                 </p>
//                 <p>You can create up to {maxCards} virtual cards maximum.</p>
//                 {isLimitReached && (
//                   <p className="text-destructive font-medium">
//                     You've reached the maximum limit of {maxCards} cards.
//                   </p>
//                 )}
//               </DialogDescription>
//             </DialogHeader>

//             <div className="py-4">
//               <div className="space-y-2">
//                 <label
//                   htmlFor="cardName"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   Card Name
//                 </label>
//                 <input
//                   id="cardName"
//                   type="text"
//                   placeholder="e.g., Jumia Card, Netflix Card"
//                   value={cardName}
//                   onChange={(e) => setCardName(e.target.value)}
//                   className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
//                   maxLength={30}
//                 />
//               </div>
//             </div>

//             <DialogFooter className="gap-2 sm:gap-0">
//               <Button variant="outline" onClick={handleClose}>
//                 Cancel
//               </Button>

//               {!isLimitReached && (
//                 <Button
//                   onClick={handleCreateCard}
//                   className="bg-primary hover:bg-primary/90"
//                   disabled={!cardName.trim()}
//                 >
//                   Create Card (₦{cardCreationFee.toLocaleString()})
//                 </Button>
//               )}
//             </DialogFooter>
//           </>
//         )}

//         {/* PROCESSING STEP */}
//         {step === "processing" && (
//           <div className="py-8 flex flex-col items-center gap-4">
//             <Loader2 className="h-12 w-12 animate-spin text-primary" />
//             <p className="text-lg font-semibold text-foreground">
//               Debiting from account…
//             </p>
//           </div>
//         )}

//         {/* SUCCESS STEP */}
//         {step === "success" && (
//           <>
//             <DialogHeader>
//               <div className="flex flex-col items-center gap-4 py-4">
//                 <CheckCircle2 className="h-16 w-16 text-primary" />
//                 <DialogTitle className="text-2xl font-bold text-center">
//                   Virtual Card Created Successfully 🎉
//                 </DialogTitle>
//               </div>
//             </DialogHeader>

//             <DialogFooter>
//               <Button
//                 onClick={handleSeeCard}
//                 className="w-full bg-primary hover:bg-primary/90"
//               >
//                 See Card
//               </Button>
//             </DialogFooter>
//           </>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVirtualCard } from "@/services/cardService";

interface CreateVirtualCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCardCount: number;
  maxCards: number;
  onCardCreated: () => void;
}

type Step = "create" | "processing" | "success";

export function CreateVirtualCardModal({
  isOpen,
  onClose,
  currentCardCount,
  maxCards,
  onCardCreated,
}: CreateVirtualCardModalProps) {
  const [step, setStep] = useState<Step>("create");
  const [cardName, setCardName] = useState("");
  const navigate = useNavigate();
  const isLimitReached = currentCardCount >= maxCards;
  const cardCreationFee = 2000;

  const handleCreateCard = async () => {
    if (isLimitReached || !cardName.trim()) return;

    setStep("processing");

    try {
      await createVirtualCard({ cardName });

      setStep("success");

      // Notify parent that card was created successfully
      onCardCreated();
    } catch (err: any) {
      console.error("Card creation failed:", err);

      alert(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to create virtual card"
      );

      setStep("create");
    }
  };

  const handleSeeCard = () => {
    onClose();
    resetModal();
    // Small delay to ensure modal closes before navigation
    setTimeout(() => {
      navigate("/cards");
    }, 100);
  };

  const resetModal = () => {
    setTimeout(() => {
      setStep("create");
      setCardName("");
    }, 300);
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {/* CREATE STEP */}
        {step === "create" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Create Virtual Card — ₦{cardCreationFee.toLocaleString()}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground space-y-2">
                <p>
                  Creating a virtual card costs ₦
                  {cardCreationFee.toLocaleString()}.
                </p>
                <p>You can create up to {maxCards} virtual cards maximum.</p>
                {isLimitReached && (
                  <p className="text-destructive font-medium">
                    You've reached the maximum limit of {maxCards} cards.
                  </p>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="space-y-2">
                <label
                  htmlFor="cardName"
                  className="text-sm font-medium text-foreground"
                >
                  Card Name
                </label>
                <input
                  id="cardName"
                  type="text"
                  placeholder="e.g., Jumia Card, Netflix Card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  maxLength={30}
                />
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>

              {!isLimitReached && (
                <Button
                  onClick={handleCreateCard}
                  className="bg-primary hover:bg-primary/90"
                  disabled={!cardName.trim()}
                >
                  Create Card (₦{cardCreationFee.toLocaleString()})
                </Button>
              )}
            </DialogFooter>
          </>
        )}

        {/* PROCESSING STEP */}
        {step === "processing" && (
          <div className="py-8 flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-semibold text-foreground">
              Debiting from account…
            </p>
          </div>
        )}

        {/* SUCCESS STEP */}
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
              <Button
                onClick={handleSeeCard}
                className="w-full bg-primary hover:bg-primary/90"
              >
                See Card
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
