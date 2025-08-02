import { Toaster } from "sonner";
import { useState } from "react";
import { LawFirmWebsite } from "./components/LawFirmWebsite";
import { AdminDashboard } from "./components/AdminDashboard";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleBackToSite = () => {
    setShowAdmin(false);
    setIsAdmin(false); // Reset admin access when exiting
  };

  return (
    <div className="min-h-screen">
      {showAdmin ? (
        <AdminDashboard onBackToSite={handleBackToSite} />
      ) : (
        <LawFirmWebsite 
          isAdmin={isAdmin} 
          onAdminAccess={() => setShowAdmin(true)}
          onSetAdminAccess={(admin: boolean) => setIsAdmin(admin)}
        />
      )}

      <Toaster />
    </div>
  );
}
