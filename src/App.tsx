import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useState, useEffect } from "react";
import { LawFirmWebsite } from "./components/LawFirmWebsite";
import { AdminDashboard } from "./components/AdminDashboard";

export default function App() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen">
      <Authenticated>
        {showAdmin ? (
          <AdminDashboard onBackToSite={() => setShowAdmin(false)} />
        ) : (
          <LawFirmWebsite 
            isAdmin={!!loggedInUser} 
            onAdminAccess={() => setShowAdmin(true)} 
          />
        )}
      </Authenticated>
      
      <Unauthenticated>
        <LawFirmWebsite isAdmin={false} />
      </Unauthenticated>

      <Toaster />
    </div>
  );
}
