// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { SuccessModal } from "./SuccessModal";

// interface OTPModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSuccess: () => void;
//   accountNumber: string;
// }

// export const OTPModal = ({ open, onOpenChange, onSuccess, accountNumber }: OTPModalProps) => {
//   const [otp, setOtp] = useState("");
//   const [timer, setTimer] = useState(59);
//   const [canResend, setCanResend] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   useEffect(() => {
//     if (open) {
//       setTimer(59);
//       setCanResend(false);
//       setOtp("");
//     }
//   }, [open]);

//   useEffect(() => {
//     if (timer > 0 && open) {
//       const interval = setInterval(() => {
//         setTimer((prev) => {
//           if (prev <= 1) {
//             setCanResend(true);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [timer, open]);

//   const handleResend = () => {
//     setTimer(59);
//     setCanResend(false);
//     setOtp("");
//   };

//   const handleVerify = () => {
//     if (otp.length === 6) {
//       setShowSuccess(true);
//       setTimeout(() => {
//         setShowSuccess(false);
//         onOpenChange(false);
//         onSuccess();
//       }, 2000);
//     }
//   };

//   const formatTimer = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   return (
//     <>
//       <Dialog open={open && !showSuccess} onOpenChange={onOpenChange}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <div className="flex items-center gap-4">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => onOpenChange(false)}
//               >
//                 <ArrowLeft className="h-5 w-5" />
//               </Button>
//               <DialogTitle>Enter OTP</DialogTitle>
//             </div>
//           </DialogHeader>

//           <div className="space-y-6 pt-4">
//             <p className="text-sm text-muted-foreground">
//               We sent a 6-digit OTP to the phone number or email linked to this account.
//             </p>

//             <div className="flex justify-center">
//               <InputOTP
//                 maxLength={6}
//                 value={otp}
//                 onChange={setOtp}
//               >
//                 <InputOTPGroup>
//                   <InputOTPSlot index={0} />
//                   <InputOTPSlot index={1} />
//                   <InputOTPSlot index={2} />
//                   <InputOTPSlot index={3} />
//                   <InputOTPSlot index={4} />
//                   <InputOTPSlot index={5} />
//                 </InputOTPGroup>
//               </InputOTP>
//             </div>

//             <div className="text-center">
//               <p className="text-sm text-muted-foreground mb-2">
//                 {formatTimer(timer)}
//               </p>
//               <Button
//                 variant="link"
//                 onClick={handleResend}
//                 disabled={!canResend}
//                 className="text-primary"
//               >
//                 Resend OTP
//               </Button>
//             </div>

//             <Button
//               onClick={handleVerify}
//               disabled={otp.length !== 6}
//               className="w-full bg-gradient-orange hover:opacity-90"
//             >
//               Verify
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <SuccessModal
//         open={showSuccess}
//         title="Login Successful"
//         message="Redirecting..."
//       />
//     </>
//   );
// };

// src/components/modals/OTPModal.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { SuccessModal } from "./SuccessModal";
import { verifyOtp, requestOtp } from "@/services/authService"; // 🚨 UPDATED IMPORT

interface OTPModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  accountNumber: string;
}

export const OTPModal = ({
  open,
  onOpenChange,
  onSuccess,
  accountNumber,
}: OTPModalProps) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // 🚨 NEW STATE: To manage API call loading
  const [loading, setLoading] = useState(false); // 🚨 NEW STATE: To show verification/resend errors
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setTimer(59);
      setCanResend(false);
      setOtp("");
      setError(null); // Clear error on open
    }
  }, [open]);

  useEffect(() => {
    if (timer > 0 && open) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, open]); // 🚨 UPDATED: API call for resending OTP

  const handleResend = async () => {
    if (!canResend || loading) return;

    setLoading(true);
    setError(null);
    setOtp("");
    try {
      // 👈 API call to re-request OTP
      await requestOtp(accountNumber);
      alert("A new OTP has been sent to your email!"); // Success feedback // Reset timer and resend capability on success
      setTimer(59);
      setCanResend(false);
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP. Try again later.");
    } finally {
      setLoading(false);
    }
  }; // 🚨 UPDATED: API call for verifying OTP

  const handleVerify = async () => {
    if (otp.length !== 6 || loading) return;

    setLoading(true);
    setError(null);

    try {
      // 👈 API call to verify OTP and get token
      await verifyOtp(otp); // If successful: Show success modal and trigger parent success handler
      setShowSuccess(true); // Use the cleanup timer for redirection
      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false); // Close the OTP modal
        onSuccess(); // Triggers navigation to /home in Login.tsx
      }, 2000);
    } catch (err: any) {
      // Handle verification errors (e.g., "Invalid OTP")
      setError(err.message || "OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      {" "}
      <Dialog open={open && !showSuccess} onOpenChange={onOpenChange}>
        {" "}
        <DialogContent className="sm:max-w-md">
          {" "}
          <DialogHeader>
            {" "}
            <div className="flex items-center gap-4">
              {" "}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                <ArrowLeft className="h-5 w-5" />{" "}
              </Button>
              <DialogTitle>Enter OTP</DialogTitle>{" "}
            </div>{" "}
          </DialogHeader>{" "}
          <div className="space-y-6 pt-4">
            {" "}
            <p className="text-sm text-muted-foreground">
              We sent a 6-digit OTP to the email linked to account **
              {accountNumber}**.{" "}
            </p>{" "}
            {error && (
              <p className="text-center text-sm text-red-500">{error}</p>
            )}{" "}
            <div className="flex justify-center">
              {" "}
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                disabled={loading}
              >
                {" "}
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />{" "}
                </InputOTPGroup>{" "}
              </InputOTP>{" "}
            </div>{" "}
            <div className="text-center">
              {" "}
              <p className="text-sm text-muted-foreground mb-2">
                {formatTimer(timer)}{" "}
              </p>{" "}
              <Button
                variant="link"
                onClick={handleResend}
                disabled={!canResend || loading}
                className="text-primary"
              >
                {" "}
                {loading && canResend ? "Sending..." : "Resend OTP"}{" "}
              </Button>{" "}
            </div>{" "}
            <Button
              onClick={handleVerify}
              disabled={otp.length !== 6 || loading}
              className="w-full bg-gradient-orange hover:opacity-90"
            >
              {loading ? "Verifying..." : "Verify"}{" "}
            </Button>{" "}
          </div>{" "}
        </DialogContent>{" "}
      </Dialog>
      <SuccessModal
        open={showSuccess}
        title="Login Successful"
        message="Redirecting..."
      />
    </>
  );
};
