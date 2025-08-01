import { Toaster } from "sonner";
import { useState } from "react";
import { LawFirmWebsite } from "./components/LawFirmWebsite";
import { AdminDashboard } from "./components/AdminDashboard";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen">
      {showAdmin ? (
        <AdminDashboard onBackToSite={() => setShowAdmin(false)} />
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
