import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Menu, X, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderProps {
  onLanguageChange: (lang: string) => void;
  currentLanguage: string;
}

export const Header = ({ onLanguageChange, currentLanguage }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-orange rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">GO CARDS</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#cards" className="text-foreground hover:text-primary transition-colors">
              Cards
            </a>
            <a href="#security" className="text-foreground hover:text-primary transition-colors">
              Security
            </a>
            <a href="#support" className="text-foreground hover:text-primary transition-colors">
              Support
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Select value={currentLanguage} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-[130px]">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ig">Igbo</SelectItem>
                <SelectItem value="yo">Yoruba</SelectItem>
                <SelectItem value="ha">Hausa</SelectItem>
                <SelectItem value="pi">Pidgin</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="default" className="bg-gradient-orange hover:opacity-90">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <nav className="flex flex-col gap-4">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#cards" className="text-foreground hover:text-primary transition-colors">
                Cards
              </a>
              <a href="#security" className="text-foreground hover:text-primary transition-colors">
                Security
              </a>
              <a href="#support" className="text-foreground hover:text-primary transition-colors">
                Support
              </a>
            </nav>
            <Select value={currentLanguage} onValueChange={onLanguageChange}>
              <SelectTrigger>
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ig">Igbo</SelectItem>
                <SelectItem value="yo">Yoruba</SelectItem>
                <SelectItem value="ha">Hausa</SelectItem>
                <SelectItem value="pi">Pidgin</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="default" className="w-full bg-gradient-orange hover:opacity-90">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
