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

interface OTPModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  accountNumber: string;
}

export const OTPModal = ({ open, onOpenChange, onSuccess, accountNumber }: OTPModalProps) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setTimer(59);
      setCanResend(false);
      setOtp("");
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
  }, [timer, open]);

  const handleResend = () => {
    setTimer(59);
    setCanResend(false);
    setOtp("");
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
        onSuccess();
      }, 2000);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Dialog open={open && !showSuccess} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <DialogTitle>Enter OTP</DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            <p className="text-sm text-muted-foreground">
              We sent a 6-digit OTP to the phone number or email linked to this account.
            </p>

            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {formatTimer(timer)}
              </p>
              <Button
                variant="link"
                onClick={handleResend}
                disabled={!canResend}
                className="text-primary"
              >
                Resend OTP
              </Button>
            </div>

            <Button
              onClick={handleVerify}
              disabled={otp.length !== 6}
              className="w-full bg-gradient-orange hover:opacity-90"
            >
              Verify
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <SuccessModal
        open={showSuccess}
        title="Login Successful"
        message="Redirecting..."
      />
    </>
  );
};
