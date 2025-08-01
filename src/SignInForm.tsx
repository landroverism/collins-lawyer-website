"use client";
import { api } from "../convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation } from "convex/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function SignInForm() {
  const signInMutation = useMutation(api.auth.signIn);
  const signUpMutation = useMutation(api.auth.signUp);
  const createAdminMutation = useMutation(api.auth.createAdminUser);
  const ensureAdminMutation = useMutation(api.auth.ensureDefaultAdmin);
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp" | "createAdmin">("signIn");
  const [submitting, setSubmitting] = useState(false);

  // Ensure default admin exists on component mount
  useEffect(() => {
    ensureAdminMutation({}).catch(console.error);
  }, [ensureAdminMutation]);

  return (
    <div className="fixed-modal">
      <form
        className="flex flex-col gap-6"
        onSubmit={async (e) => {
          e.preventDefault();
          setSubmitting(true);
          const formData = new FormData(e.target as HTMLFormElement);
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;

          try {
            if (flow === "signIn") {
              const response = await signInMutation({ email, password });
              if (response?.userId) {
                // Convert the response to a string token format expected by signIn
                await signIn(response.userId);
                toast.success("Signed in successfully!");
              }
            } else if (flow === "signUp") {
              const response = await signUpMutation({ email, password });
              if (response?.userId) {
                await signIn(response.userId);
                toast.success("Sign-up successful!");
              }
            } else if (flow === "createAdmin") {
              const response = await createAdminMutation({ email, password });
              if (response?.userId) {
                await signIn(response.userId);
                toast.success(`Admin user ${response.message}!`);
              }
            }
          } catch (err) {
            const error = err as Error;
            console.error("Auth error:", error);
            toast.error(error?.message || "Authentication failed");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <input
          className="w-full px-4 py-3 border-2 border-light-gray dark:border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange transition-all duration-300 bg-white dark:bg-deep-blue text-deep-blue dark:text-white"
          type="email"
          name="email"
          placeholder="Email Address"
          required
        />
        <input
          className="w-full px-4 py-3 border-2 border-light-gray dark:border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange transition-all duration-300 bg-white dark:bg-deep-blue text-deep-blue dark:text-white"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button
          className="w-full px-4 py-3 bg-warm-orange text-white rounded-lg hover:bg-warm-orange-dark transition-all duration-300 font-semibold"
          type="submit"
          disabled={submitting}
        >
          {submitting 
            ? "Processing..." 
            : flow === "signIn" 
              ? "Sign In" 
              : flow === "signUp" 
                ? "Sign Up" 
                : "Create Admin"}
        </button>
        <div className="text-center text-sm text-secondary">
          <span>
            {flow === "signIn"
              ? "Don't have an account? "
              : flow === "signUp"
                ? "Already have an account? "
                : "Want to sign in instead? "}
          </span>
          <button
            type="button"
            className="text-warm-orange hover:text-warm-orange-dark hover:underline font-medium cursor-pointer"
            onClick={() => {
              if (flow === "signIn") setFlow("signUp");
              else if (flow === "signUp") setFlow("createAdmin");
              else setFlow("signIn");
            }}
          >
            {flow === "signIn" 
              ? "Sign up instead" 
              : flow === "signUp"
                ? "Create admin instead"
                : "Sign in instead"}
          </button>
        </div>
        <div className="flex items-center justify-center my-3">
          <hr className="my-4 grow border-gray-200" />
          <span className="mx-4 text-secondary">or</span>
          <hr className="my-4 grow border-gray-200" />
        </div>
        <button
          className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 font-semibold"
          onClick={() => void signIn("anonymous")}
        >
          Sign in anonymously
        </button>
      </form>
    </div>
  );
}
