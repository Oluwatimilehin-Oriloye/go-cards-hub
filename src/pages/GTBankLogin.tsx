import { useNavigate } from "react-router-dom";
import { loginWithPassword } from "@/services/authService";
import { useState} from "react";

export default function GTBankLogin() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUserId, setRememberUserId] = useState(false);

  const handleKeypadClick = (value: string) => {
    setPassword(prev => prev + value);
  };

  const handleClear = () => {
    setPassword("");
  };

  const handleDelete = () => {
    setPassword(prev => prev.slice(0, -1));
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");
  
    const result = await loginWithPassword(userId, password);
  
    if (result.success) {

      // Store User + Token
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);
      
      navigate("/dashboard");
      return;
    }
  
    setErrorMessage(result.message);
  
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }; 

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      
      {/* Top Header with Logo */}
      <div className="bg-white py-4 px-8 flex justify-end border-b border-gray-200">
        <div className="text-right">
          <div className="w-12 h-12 bg-[#FF5F00] flex items-center justify-center text-white font-bold text-lg">
            GTCO
          </div>
          <p className="text-xs text-gray-500 mt-1">Guaranty Trust Bank Ltd</p>
        </div>
      </div>

      {/* Internet Banking Header */}
      <div className="bg-[#E6E6E6] py-3 px-8 mx-8 mt-6">
        <h1 className="text-xl font-bold text-black">INTERNET BANKING</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Login Form */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
              <h2 className="text-xl font-semibold text-center mb-2">
                Online Realtime Balances and Transactions
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Kindly Login with any of{" "}
                <span className="text-[#FF5F00]">UserID, Account Number, Phone Number or Email</span>{" "}
                and use the keypad for your password.
              </p>
              {errorMessage && (
              <div className="animate-slide-in bg-orange-500 text-white px-4 py-2 rounded mb-4">
                {errorMessage}
              </div>
            )}

              {/* Login Form */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="w-24 text-right text-gray-700">UserId:</label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="flex-1 max-w-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#FF5F00]"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-24 text-right text-gray-700">Password:</label>
                  <input
                    type="password"
                    value={password}
                    readOnly
                    className="flex-1 max-w-xs border border-gray-300 rounded px-3 py-2 bg-white"
                  />
                </div>

                {/* Numeric Keypad */}
                <div className="flex justify-center mt-4">
                  <div className="grid grid-cols-4 gap-1">
                    {/* Row 1 */}
                    <button onClick={() => handleKeypadClick("0")} className="w-12 h-10 border border-gray-300 bg-white hover:bg-gray-100 font-semibold">0</button>
                    <button onClick={() => handleKeypadClick("2")} className="w-12 h-10 border border-gray-300 bg-white hover:bg-gray-100 font-semibold">2</button>
                    <button onClick={() => handleKeypadClick("4")} className="w-12 h-10 border border-gray-300 bg-white hover:bg-gray-100 font-semibold">4</button>
                    <button onClick={handleClear} className="w-12 h-10 bg-[#FF5F00] text-white font-semibold hover:bg-[#e55500]">CLR</button>
                    
                    {/* Row 2 */}
                    <button onClick={() => handleKeypadClick("3")} className="w-12 h-10 border border-gray-300 bg-white hover:bg-gray-100 font-semibold">3</button>
                    <button onClick={() => handleKeypadClick("6")} className="w-12 h-10 border border-gray-300 bg-white hover:bg-gray-100 font-semibold">6</button>
                    <button onClick={() => handleKeypadClick("5")} className="w-12 h-10 border border-gray-300 bg-white hover:bg-gray-100 font-semibold">5</button>
                    <button onClick={handleDelete} className="w-12 h-10 bg-[#FF5F00] text-white font-semibold hover:bg-[#e55500]">DEL</button>
                    
                    {/* Row 3 */}
                    <button onClick={() => handleKeypadClick("7")} className="w-12 h-10 border border-gray-300 bg-white hover:bg-gray-100 font-semibold">7</button>
                    <button onClick={() => handleKeypadClick("8")} className="w-12 h-10 border border-gray-300 bg-white hover:bg-gray-100 font-semibold">8</button>
                    <button onClick={() => handleKeypadClick("9")} className="w-12 h-10 border border-gray-300 bg-white hover:bg-gray-100 font-semibold">9</button>
                    <button onClick={handleLogin} className="w-12 h-20 bg-[#00A651] text-white font-semibold hover:bg-[#008f46] row-span-2">Login</button>
                    
                    {/* Row 4 */}
                    <button onClick={() => handleKeypadClick("1")} className="w-12 h-10 border border-gray-300 bg-white hover:bg-gray-100 font-semibold col-start-3">1</button>
                  </div>
                </div>

                {/* Links */}
                <div className="text-center mt-4 space-y-1">
                  <a href="#" className="text-gray-600 hover:text-[#FF5F00] text-sm block">Forgot your password?</a>
                  <a href="#" className="text-gray-600 hover:text-[#FF5F00] text-sm block">Forgot your secret question?</a>
                </div>

                {/* Register Section */}
                <div className="text-center mt-6">
                  <p className="text-gray-500 text-sm mb-2">— New here?</p>
                  <button className="bg-[#FF5F00] text-white px-6 py-2 rounded hover:bg-[#e55500] font-semibold">
                    Click to<br />register
                  </button>
                </div>

                {/* Remember UserId */}
                <div className="flex items-center justify-center mt-6 gap-2">
                  <input
                    type="checkbox"
                    id="rememberUserId"
                    checked={rememberUserId}
                    onChange={(e) => setRememberUserId(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="rememberUserId" className="text-gray-700">Remember My UserID</label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - GTWorld Promo */}
          <div className="lg:w-80 space-y-6">
            {/* GTWorld Card */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-600 text-lg">Do More</p>
              <h3 className="text-[#FF5F00] text-2xl font-bold mb-4">with GTWorld</h3>
              <div className="bg-gray-300 h-48 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">GTWorld App Preview</span>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                <div className="bg-black text-white text-xs px-3 py-1 rounded">App Store</div>
                <div className="bg-black text-white text-xs px-3 py-1 rounded">Google Play</div>
              </div>
            </div>

            {/* Fraud Warning */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <h3 className="text-[#FF5F00] text-lg font-semibold mb-4">Suspect a fraudulent site?</h3>
              <div className="bg-gray-100 h-24 rounded flex items-center justify-center mb-4">
                <span className="text-gray-500 text-sm">Browser Security Image</span>
              </div>
              <p className="text-gray-600 text-sm">
                Please report to us by<br />sending an email to
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl">
          {/* Security Tips */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-b from-red-500 via-yellow-500 to-green-500 rounded"></div>
              <div>
                <h4 className="font-bold text-gray-800">Security Tips</h4>
                <p className="text-gray-600 text-sm mt-2">
                  Please note that GTBank will NEVER ask you to provide your PIN (Personal Identification Numbers).
                </p>
              </div>
            </div>
            <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">
              READ MORE
            </button>
          </div>

          {/* Token Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="font-bold text-gray-800">Do you have a token?</h4>
            <p className="text-gray-600 text-sm mt-2">
              Get a Token today and begin to carry out third party transfers and online payments.
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-24 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-500">Token</span>
              </div>
            </div>
            <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">
              GET YOURS
            </button>
          </div>

          {/* Account Transfers */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="font-bold text-gray-800">Account Transfers (Instant)</h4>
            <p className="text-gray-600 text-sm mt-2">
              The fastest way to transfer money to other bank accounts
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xl font-bold">₦</span>
              <div className="flex-1 h-3 bg-green-500 rounded-full"></div>
            </div>
            <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">
              TRY IT TODAY
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#FF5F00] text-white py-3 px-8 text-center text-sm">
        <p>
          © 2025 Guaranty Trust Bank Limited. RC 152321 (Licensed by the Central Bank of Nigeria). GTBANK.COM | 
          <a href="#" className="hover:underline ml-1">PRIVACY POLICY</a> | 
          <a href="#" className="hover:underline ml-1">TERMS & CONDITIONS</a> | 
          <a href="#" className="hover:underline ml-1">WHISTLE BLOWER</a>
        </p>
      </footer>
    </div>
  );
}
