// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Globe } from "lucide-react";
// import { OTPModal } from "@/components/modals/OTPModal";
// import loginPerson2 from "@/assets/login-person-2.jpg";
// import loginPerson3 from "@/assets/login-person-3.jpg";
// import loginPerson4 from "@/assets/login-person-4.jpg";

// const loginImages = [ loginPerson2, loginPerson3, loginPerson4];

// export default function Login() {
//   const navigate = useNavigate();
//   const [language, setLanguage] = useState("en");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [showOTPModal, setShowOTPModal] = useState(false);
//   const [randomImage] = useState(() =>
//     loginImages[Math.floor(Math.random() * loginImages.length)]
//   );

//   const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/\D/g, "").slice(0, 10);
//     setAccountNumber(value);
//   };

//   const handleContinue = () => {
//     if (accountNumber.length === 10) {
//       setShowOTPModal(true);
//     }
//   };

//   const handleOTPSuccess = () => {
//     navigate("/home");
//   };

//   return (
//     <div className="min-h-screen bg-background flex flex-col lg:flex-row">
//       {/* Left Side - Image Card */}
//       <div className="lg:w-1/2 relative overflow-hidden h-64 lg:h-screen">
//         <div className="absolute inset-0">
//           <img
//             src={randomImage}
//             alt="GoCard user"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-transparent" />
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//           <h2 className="text-3xl lg:text-4xl font-bold mb-4">
//             Instantly manage your cards with GoCard
//           </h2>

//           <div className="flex items-center gap-4 text-sm mt-8">
//             <span>© GoCard 2025</span>
//             <span>|</span>
//             <a href="#" className="hover:text-primary transition-colors">Help Center</a>
//             <span>|</span>
//             <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
//         <div className="w-full max-w-md">
//           {/* Language Selector */}
//           <div className="flex justify-end mb-8">
//             <Select value={language} onValueChange={setLanguage}>
//               <SelectTrigger className="w-[180px]">
//                 <Globe className="w-4 h-4 mr-2" />
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="en">English (US)</SelectItem>
//                 <SelectItem value="ig">Igbo</SelectItem>
//                 <SelectItem value="yo">Yoruba</SelectItem>
//                 <SelectItem value="ha">Hausa</SelectItem>
//                 <SelectItem value="pi">Pidgin</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Login Card */}
//           <div className="bg-card p-8 rounded-2xl shadow-card-hover">
//             <h1 className="text-2xl font-bold mb-6">
//               Login to your GoCard Account
//             </h1>

//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="accountNumber">Account Number</Label>
//                 <Input
//                   id="accountNumber"
//                   type="text"
//                   inputMode="numeric"
//                   placeholder="Enter 10-digit account number"
//                   value={accountNumber}
//                   onChange={handleAccountNumberChange}
//                   maxLength={10}
//                   className="text-lg"
//                 />
//               </div>

//               <Button
//                 onClick={handleContinue}
//                 disabled={accountNumber.length !== 10}
//                 className="w-full bg-gradient-orange hover:opacity-90 text-lg h-12"
//               >
//                 Continue
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <OTPModal
//         open={showOTPModal}
//         onOpenChange={setShowOTPModal}
//         onSuccess={handleOTPSuccess}
//         accountNumber={accountNumber}
//       />
//     </div>
//   );
// }

// src/pages/Login.tsx
import { useState } from "react"; // Removed unused useEffect
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { OTPModal } from "@/components/modals/OTPModal";
import { requestOtp } from "@/services/authService"; // 🚨 NEW IMPORT
import loginPerson2 from "@/assets/login-person-2.jpg";
import loginPerson3 from "@/assets/login-person-3.jpg";
import loginPerson4 from "@/assets/login-person-4.jpg";

const loginImages = [loginPerson2, loginPerson3, loginPerson4];

export default function Login() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [accountNumber, setAccountNumber] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  // 🚨 NEW STATE: To manage loading for the API call (request OTP)
  const [loading, setLoading] = useState(false);
  // 🚨 NEW STATE: To show errors from the API call
  const [error, setError] = useState<string | null>(null);
  const [randomImage] = useState(
    () => loginImages[Math.floor(Math.random() * loginImages.length)]
  );

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setAccountNumber(value);
    setError(null); // Clear error when input changes
  };

  // 🚨 UPDATED: Call the NestJS API to request OTP
  const handleContinue = async () => {
    if (accountNumber.length === 10) {
      setLoading(true);
      setError(null);
      try {
        await requestOtp(accountNumber); // 👈 API call to NestJS
        setShowOTPModal(true); // Open the modal only on success
      } catch (err: any) {
        // Error is already formatted in authService.ts
        setError(err.message || "Failed to send OTP. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOTPSuccess = () => {
    // This function is called by OTPModal upon successful token receipt
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left Side - Image Card (No changes) */}
      <div className="lg:w-1/2 relative overflow-hidden h-64 lg:h-screen">
        {/* ... content ... */}
        <div className="absolute inset-0">
          <img
            src={randomImage}
            alt="GoCard user"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Instantly manage your cards with GoCard
          </h2>

          <div className="flex items-center gap-4 text-sm mt-8">
            <span>© GoCard 2025</span>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">
              Help Center
            </a>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          {/* Language Selector (No changes) */}
          <div className="flex justify-end mb-8">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (US)</SelectItem>
                <SelectItem value="ig">Igbo</SelectItem>
                <SelectItem value="yo">Yoruba</SelectItem>
                <SelectItem value="ha">Hausa</SelectItem>
                <SelectItem value="pi">Pidgin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Login Card */}
          <div className="bg-card p-8 rounded-2xl shadow-card-hover">
            <h1 className="text-2xl font-bold mb-6">
              Login to your GoCard Account
            </h1>

            <div className="space-y-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
              {/* 🚨 Display Error */}
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter 10-digit account number"
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                  maxLength={10}
                  className="text-lg"
                  disabled={loading} // 🚨 Disable input while loading
                />
              </div>
              <Button
                onClick={handleContinue}
                disabled={accountNumber.length !== 10 || loading} // 🚨 Disable button based on loading
                className="w-full bg-gradient-orange hover:opacity-90 text-lg h-12"
              >
                {loading ? "Sending OTP..." : "Continue"}{" "}
                {/* 🚨 Show Loading Text */}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <OTPModal
        open={showOTPModal}
        onOpenChange={setShowOTPModal}
        onSuccess={handleOTPSuccess}
        accountNumber={accountNumber}
      />
    </div>
  );
}
