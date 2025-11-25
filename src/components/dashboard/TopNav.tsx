import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { ChangePasswordModal } from "@/components/modals/ChangePasswordModal";
import { EditProfilePictureModal } from "@/components/modals/EditProfilePictureModal";
import { useTranslation } from "react-i18next";

export function TopNav() {
  const { i18n } = useTranslation();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Left side - Greeting */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">Hello Ikenga, 👋</h2>
            <p className="text-sm text-muted-foreground">Send, save and receive funds in various currencies</p>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <Select value={i18n.language} onValueChange={handleLanguageChange}>
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

            {/* Settings */}
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Settings"
              onClick={() => setShowPasswordModal(true)}
            >
              <Settings className="h-5 w-5" />
            </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>

            {/* Profile */}
            <Avatar 
              className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setShowProfileModal(true)}
            >
              <AvatarFallback className="bg-primary text-primary-foreground">IO</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Modals */}
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
