import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import { query, mutation } from "./_generated/server";
import bcrypt from "bcryptjs";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password, Anonymous],
});

export const loggedInUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      return null;
    }
    return { id: user._id, role: user.role }; // Include role in the response
  },
});

export const createDefaultAdmin = mutation({
  handler: async (ctx) => {
    const existingAdmin = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), "kemboiham3@gmail.com"))
      .first();

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("kem98@#$", 10); // Hash the password
      await ctx.db.insert("users", {
        email: "kemboiham3@gmail.com",
        password: hashedPassword, // Store the hashed password
        role: "admin",
        createdAt: new Date(),
      });
      console.log("Default admin user created.");
    } else {
      console.log("Default admin user already exists.");
    }
  },
});

export const signIn = mutation({
  handler: async (ctx, { email, password }) => {
    console.log("Attempting to sign in with email:", email);
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    console.log("SignIn Mutation: Received email:", email);
    console.log("SignIn Mutation: Checking if user exists...");

    if (!user) {
      console.error("SignIn Mutation: User not found for email:", email);
      throw new Error("User not found");
    }

    console.log("SignIn Mutation: User found. Validating password...");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error("SignIn Mutation: Invalid password for email:", email);
      throw new Error("Invalid password");
    }

    console.log("SignIn Mutation: Password validated. Checking role...");

    if (user.role !== "admin") {
      console.error("SignIn Mutation: Unauthorized access attempt for email:", email);
      throw new Error("Unauthorized");
    }

    console.log("SignIn Mutation: Admin user signed in successfully.");
    return { id: user._id, role: user.role };
  },
});

export const signUp = mutation({
  handler: async (ctx, { email, password }) => {
    console.log("Attempting to sign up with email:", email);

    // Check if the email is already registered
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    if (existingUser) {
      console.error("Email is already registered.");
      throw new Error("Email is already registered");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await ctx.db.insert("users", {
      email,
      password: hashedPassword,
      role: "user", // Default role for new sign-ups
      createdAt: new Date(),
    });

    console.log("User signed up successfully:", newUser);
    return { id: newUser._id, role: newUser.role };
  },
});
