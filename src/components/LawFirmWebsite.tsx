import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { About } from "./About";
import { PracticeAreas } from "./PracticeAreas";
import { Testimonials } from "./Testimonials";
import { Blog } from "./Blog";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { LanguageProvider } from "./LanguageContext";

interface LawFirmWebsiteProps {
  isAdmin: boolean;
  onAdminAccess?: () => void;
  onSetAdminAccess?: (admin: boolean) => void;
}

export function LawFirmWebsite({ isAdmin, onAdminAccess, onSetAdminAccess }: LawFirmWebsiteProps) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white transition-colors">
        <Header isAdmin={isAdmin} onAdminAccess={onAdminAccess} />
        <main>
          <Hero />
          <About />
          <PracticeAreas />
          <Testimonials />
          <Blog />
          <Contact />
        </main>
        <Footer onSetAdminAccess={onSetAdminAccess} />
      </div>
    </LanguageProvider>
  );
}