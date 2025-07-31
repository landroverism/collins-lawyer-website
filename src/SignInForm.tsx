"use client";
import { api } from "../convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

export function SignInForm() {
  const signInMutation = useMutation(api.auth.signIn);
  const signUpMutation = useMutation(api.auth.signUp);
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);

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
              const result = await signInMutation({ email, password });
              if (result.role === "admin") {
                toast.success("Welcome, Admin!");
                // Redirect to admin dashboard or perform other actions
              } else {
                toast.error("Unauthorized access");
              }
            } else {
              const result = await signUpMutation({ email, password });
              toast.success("Sign-up successful! You can now sign in.");
            }
          } catch (error) {
            let toastTitle = "";
            if (error.message.includes("Invalid password")) {
              toastTitle = "Invalid password. Please try again.";
            } else {
              toastTitle =
                flow === "signIn"
                  ? "Could not sign in, did you mean to sign up?"
                  : "Could not sign up, did you mean to sign in?";
            }
            toast.error(toastTitle);
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
          {submitting ? "Signing In..." : flow === "signIn" ? "Sign In" : "Sign Up"}
        </button>
        <div className="text-center text-sm text-secondary">
          <span>
            {flow === "signIn"
              ? "Don't have an account? "
              : "Already have an account? "}
          </span>
          <button
            type="button"
            className="text-warm-orange hover:text-warm-orange-dark hover:underline font-medium cursor-pointer"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
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
