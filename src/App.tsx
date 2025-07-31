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
  const isAdmin = loggedInUser?.role === "admin"; // Determine if the user is an admin

  return (
    <div className="min-h-screen">
      <Authenticated>
        {showAdmin ? (
          <AdminDashboard onBackToSite={() => setShowAdmin(false)} />
        ) : (
          <LawFirmWebsite 
            isAdmin={isAdmin} 
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
