// src/components/dashboard/TopNav.tsx (UPDATED)
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// 🚨 ADD useEffect for fetching data
import { useState, useEffect } from "react";
import { ChangePasswordModal } from "@/components/modals/ChangePasswordModal";
import { EditProfilePictureModal } from "@/components/modals/EditProfilePictureModal";
import { useTranslation } from "react-i18next";
// 🚨 Import the service function and UserProfile type
import { getProfile, UserProfile } from "@/services/authService";

export function TopNav() {
  const { i18n } = useTranslation();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // 🚨 NEW STATE: To hold the fetched user profile data
  const [profile, setProfile] = useState<UserProfile | null>(null);
  // Optional: State for loading/error if you need visual indicators
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 🚨 DATA FETCHING LOGIC
  useEffect(() => {
    const fetchProfileData = async () => {
      // Check if a token exists before attempting to fetch
      if (!localStorage.getItem("authToken")) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile();
        setProfile(data);
        setError(false);
      } catch (err) {
        // Handle errors (e.g., token expired, network error)
        console.error("Failed to fetch user profile for TopNav:", err);
        setError(true);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []); // Run once on component mount

  // 🚨 DERIVE DISPLAY VALUES
  // Use a fallback name based on state
  const firstName = profile?.firstName || (loading ? "Loading..." : "User");
  // Use initials for the AvatarFallback
  const initials = profile
    ? (
        profile.firstName[0] + (profile.lastName ? profile.lastName[0] : "")
      ).toUpperCase()
    : "U"; // Fallback initial

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Left side - Greeting */}
          <div>
            {/* 🚨 DYNAMIC GREETING */}
            <h2 className="text-lg font-semibold text-foreground">
              Hello {firstName}, 👋
            </h2>
            <p className="text-sm text-muted-foreground">
              Send, save and receive funds in various currencies
            </p>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-4">
            {/* Language Selector (Unchanged) */}
            <Select value={i18n.language} onValueChange={handleLanguageChange}>
              {/* ... Select options ... */}
              <SelectTrigger className="w-[180px] border-0 bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (Nigeria)</SelectItem>
                <SelectItem value="yo">Yoruba</SelectItem>
                <SelectItem value="ha">Hausa</SelectItem>
                <SelectItem value="ig">Igbo</SelectItem>
                <SelectItem value="pcm">Nigerian Pidgin</SelectItem>
              </SelectContent>
            </Select>

            {/* Settings (Unchanged) */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Settings"
              onClick={() => setShowPasswordModal(true)}
            >
              <Settings className="h-5 w-5" />
            </Button>

            {/* Notifications (Unchanged) */}
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>

            {/* Profile */}
            <Avatar
              className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setShowProfileModal(true)}
            >
              {/* 🚨 DYNAMIC INITIALS */}
              <AvatarFallback className="bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Modals (Unchanged) */}
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />

      <EditProfilePictureModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
}
