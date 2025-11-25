import { Home, CreditCard, DollarSign, Bell, Repeat, LogOut, BookOpen } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LogoutModal } from "@/components/modals/LogoutModal";
import { SupportModal } from "@/components/modals/SupportModal";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function Sidebar() {
  const { t } = useTranslation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const navigation = [
    { name: t('nav.home'), href: "/home", icon: Home },
    { name: t('nav.accounts'), href: "/accounts", icon: CreditCard },
    { name: t('nav.payments'), href: "/payments", icon: DollarSign },
    { name: t('nav.transactions'), href: "/transactions", icon: Repeat },
    { name: t('nav.cards'), href: "/cards", icon: CreditCard },
    { name: t('nav.notifications'), href: "/notifications", icon: Bell },
  ];

  const handleLogout = () => {
    toast.success("Logged out successfully");
    setShowLogoutModal(false);
    // Add logout logic here
  };

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-border px-6">
            <h1 className="text-xl font-bold text-foreground">GO CARDS</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                )}
                activeClassName="border-l-4 border-primary bg-muted text-foreground"
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Section - Help & Logout */}
          <div className="border-t border-border px-3 py-4 space-y-1">
            <button
              onClick={() => setShowSupportModal(true)}
              className={cn(
                "w-full group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                "hover:bg-muted text-foreground"
              )}
            >
              <BookOpen className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span>{t('nav.helpBible')}</span>
            </button>

            <button
              onClick={() => setShowLogoutModal(true)}
              className={cn(
                "w-full group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                "hover:bg-destructive/10 text-destructive"
              )}
            >
              <LogOut className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span>{t('nav.logout')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Modals */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />

      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </>
  );
}
