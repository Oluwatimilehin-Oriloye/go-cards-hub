import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  CreditCard,
  Smartphone,
  Zap,
  Receipt,
  Tv,
  FileText,
  Banknote,
  Shield,
  RefreshCw,
  FileCheck,
  Plane,
  TrendingUp,
  Settings,
  PiggyBank,
  Building,
  Truck,
  Heart,
  MessageSquare,
  LogOut,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Download,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import gtcoLogo from "@/assets/gtco-logo.png";

const sidebarItems = [
  {
    label: "My Accounts",
    icon: Home,
    hasSubmenu: true,
    submenu: [
      "Balance Enquiry",
      "Transaction Details",
      "Account Statement",
      "Additional Account",
      "Account Profile Maintenance",
      "Send Statement to Embassy",
      "Send Statement to Thirdparty",
      "Secure E-mail",
    ],
  },
  { label: "Account Transfers", icon: RefreshCw, badge: "new" },
  { label: "Cards", icon: CreditCard },
  { label: "Airtime & Data Bundle", icon: Smartphone },
  { label: "Electricity Payment", icon: Zap, badge: "new" },
  { label: "Payments & Collections", icon: Receipt },
  { label: "Cable TV", icon: Tv },
  { label: "Remita Payment", icon: FileText },
  { label: "Quick Loans", icon: Banknote, badge: "new" },
  { label: "Insurance(Bancassurance)", icon: Shield },
  { label: "Bancassurance Products", icon: Shield },
  { label: "FX Transactions", icon: TrendingUp, badge: "new" },
  { label: "Cheques", icon: FileCheck },
  { label: "Airlines & Travels", icon: Plane, badge: "new" },
  { label: "Trade", icon: TrendingUp },
  { label: "Self Service", icon: Settings },
  { label: "Investments", icon: PiggyBank },
  { label: "Tax and Levies", icon: Building },
  { label: "Shipping and Distributors", icon: Truck },
  { label: "Insurance & HMO", icon: Heart },
  { label: "Customer Feedback", icon: MessageSquare },
  { label: "Log Off", icon: LogOut },
];

const navTabs = [
  "Airtime Purchase",
  "Transfer To GTBank",
  "Transfer To Other Banks(NIP)",
  "Bills Payments",
];

export default function GTBankDashboard() {
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState<string | null>("My Accounts");
  const [hideBalance, setHideBalance] = useState(false);
  const [hideBVN, setHideBVN] = useState(false);

  const toggleMenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <img src={gtcoLogo} alt="GTCO" className="h-12" />
            <div className="flex items-center gap-2 text-gray-700">
              <Home className="h-5 w-5 text-primary" />
              <span className="text-lg font-medium">Internet Banking</span>
            </div>
          </div>
          <button 
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <span className="text-sm text-gray-600">Log Off</span>
            <LogOut className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center px-4 py-2 gap-2">
          <div className="w-64 bg-primary h-10 rounded" />
          {navTabs.map((tab) => (
            <Button
              key={tab}
              variant="default"
              className="bg-primary hover:bg-orange-600 text-white rounded px-4 py-2 text-sm font-medium"
            >
              {tab}
            </Button>
          ))}
          <Button
            onClick={() => navigate("/go-cards-dashboard")}
            className="bg-primary hover:bg-orange-600 text-white rounded-full px-6 py-2 text-sm font-bold shadow-lg hover:shadow-xl transition-all"
          >
            GT GO CARDS
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white min-h-[calc(100vh-120px)] border-r border-gray-200">
          {/* Search Box */}
          <div className="p-3 border-b border-gray-200">
            <div className="flex">
              <input
                type="text"
                placeholder="What would you like to do today?"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l focus:outline-none focus:border-primary"
              />
              <Button className="bg-gray-200 text-gray-700 rounded-l-none rounded-r px-3 py-2 text-sm hover:bg-gray-300">
                Go!
              </Button>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="py-2">
            {sidebarItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => item.hasSubmenu && toggleMenu(item.label)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium">{item.label}</span>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="bg-primary text-white text-xs px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                    {item.hasSubmenu &&
                      (expandedMenu === item.label ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      ))}
                  </div>
                </button>
                {item.hasSubmenu && expandedMenu === item.label && item.submenu && (
                  <div className="bg-gray-50">
                    {item.submenu.map((sub) => (
                      <button
                        key={sub}
                        className="w-full text-left px-8 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-3xl font-light text-gray-700 mb-4">Welcome, Philip</h1>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-primary font-medium">Your last login:</span>{" "}
                <span className="text-gray-600">08-December-2025 at 12:28:17 PM (GMT+1)</span>
              </p>
              <p>
                <span className="text-primary font-medium">BVN:</span>{" "}
                <span className="text-gray-600">{hideBVN ? "••••••••••" : "22497211079"}</span>
              </p>
              <p>
                <span className="text-primary font-medium">Token Serial Number:</span>{" "}
                <span className="text-gray-600">Token is not attached to this account</span>
              </p>
              <p>
                <span className="text-primary font-medium">NIN:</span>{" "}
                <span className="text-gray-600">{hideBVN ? "••••••••••" : "99295889874"}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Switch checked={hideBVN} onCheckedChange={setHideBVN} />
              <span className="text-primary text-sm font-medium">Hide BVN and NIN</span>
            </div>
          </div>

          {/* Did You Know Section */}
          <div className="bg-green-600 text-white p-4 rounded mb-6">
            <h3 className="font-bold mb-2">Did you know?</h3>
            <p className="text-sm">
              Instant payment is now available on both savings and current account. Savings account
              holders can transfer up to N50, 000 daily using this feature. Start by clicking the{" "}
              <span className="underline cursor-pointer">Account Transfers</span> menu upon login.
            </p>
          </div>

          {/* Account Status Section */}
          <div className="bg-white rounded shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-700">Account Status</h2>
              <div className="flex items-center gap-2">
                <Switch checked={hideBalance} onCheckedChange={setHideBalance} />
                <span className="text-primary text-sm font-medium">Hide Balance</span>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-white font-medium">Account Number</TableHead>
                  <TableHead className="text-white font-medium">Account Name</TableHead>
                  <TableHead className="text-white font-medium">Account Type</TableHead>
                  <TableHead className="text-white font-medium">Currency</TableHead>
                  <TableHead className="text-white font-medium">Account Status</TableHead>
                  <TableHead className="text-white font-medium">Book Balance</TableHead>
                  <TableHead className="text-white font-medium">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-gray-50">
                  <TableCell className="text-primary font-medium cursor-pointer hover:underline">
                    0718259676
                  </TableCell>
                  <TableCell>TORIOLA, PHILIP GBOUNMI</TableCell>
                  <TableCell>SAVINGS</TableCell>
                  <TableCell>NGN</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>{hideBalance ? "••••••" : "147.93"}</TableCell>
                  <TableCell className="font-bold">
                    {hideBalance ? "••••••" : "143.63"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-sm text-gray-500 mt-2">
              * Click on the <span className="text-primary font-medium">Account Number</span> to see
              details for an account.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* GT App Store Card */}
            <div className="bg-white rounded-lg shadow-sm p-4 relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="text-primary">
                  <Download className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">GT App Store</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Join our simple world of banking without limits by clicking on the links below
                    to download our applications.
                  </p>
                  <Button className="bg-gray-700 hover:bg-gray-800 text-white text-xs px-4 py-2">
                    CLICK TO VISIT
                  </Button>
                </div>
              </div>
            </div>

            {/* Security Tips Card */}
            <div className="bg-white rounded-lg shadow-sm p-4 relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="text-blue-500">
                  <Lock className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">Security Tips</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Please note that GTBank will NEVER ask you to provide your PIN (Personal
                    Identification N...
                  </p>
                  <Button className="bg-gray-700 hover:bg-gray-800 text-white text-xs px-4 py-2">
                    READ MORE
                  </Button>
                </div>
              </div>
            </div>

            {/* Token Card */}
            <div className="bg-white rounded-lg shadow-sm p-4 relative overflow-hidden">
              <div>
                <h3 className="font-bold text-gray-700 mb-2">Do you have a token?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Get a Token today and begin to carry out third party transfers and online pa...
                </p>
                <Button className="bg-primary hover:bg-orange-600 text-white text-xs px-4 py-2">
                  GET YOURS
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 text-sm">
        © 2025 Guaranty Trust Bank Limited. RC 152321 (Licensed by the Central Bank of Nigeria).
        GTBANK.COM | PRIVACY POLICY | TERMS & CONDITIONS | WHISTLE BLOWER
      </footer>
    </div>
  );
}
