import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CardCarousel } from "@/components/CardCarousel";
import { Customers } from "@/components/Customers";
import { Security } from "@/components/Security";
import { Footer } from "@/components/Footer";
import { translations } from "@/lib/translations";


const LandingIndex = () => {
  const [language, setLanguage] = useState("en");
  const content = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-background">
      <Header onLanguageChange={setLanguage} currentLanguage={language} />
      <main>
        <Hero content={content.hero} />
        <Features content={content.features} />
        <CardCarousel />
        <Customers />
        <Security />
      </main>
      <Footer />
    </div>
  );
};

export default LandingIndex;
