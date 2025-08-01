import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { GenericDatabaseReader } from "convex/server";
import bcrypt from "bcryptjs";
import { Doc, Id } from "./_generated/dataModel";
import { DataModel } from "./_generated/dataModel";

// Helper function to safely get user data with proper type parameter
async function getUserById(db: GenericDatabaseReader<DataModel>, userId: Id<"users">) {
  const user = await db.get(userId);
  if (!user || !("role" in user)) {
    return null;
  }
  return user as Doc<"users">;
}

export const signIn = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    if (user.role !== "admin") {
      throw new Error("Unauthorized access");
    }

    return { userId: user._id, role: user.role };
  },
});

export const signUp = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, { email, password, name }) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await ctx.db.insert("users", {
      email,
      password: hashedPassword,
      name,
      role: "user",
      createdAt: Date.now(),
    });

    return { userId, role: "user" };
  },
});

// Changed to internalMutation to make it accessible via CLI
export const createDefaultAdmin = internalMutation({
  handler: async (ctx) => {
    console.log("Starting createDefaultAdmin mutation...");

    const existingAdmin = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), "kemboiham3@gmail.com"))
      .first();

    if (!existingAdmin) {
      console.log("No existing admin found, creating new admin...");
      const hashedPassword = await bcrypt.hash("kem98@#$", 10);
      const adminId = await ctx.db.insert("users", {
        name: "Admin User",
        email: "kemboiham3@gmail.com",
        password: hashedPassword,
        role: "admin",
        createdAt: Date.now(),
      });
      console.log("Admin user created successfully with ID:", adminId);
      return { success: true, message: "Default admin user created", adminId };
    }

    console.log("Admin user already exists");
    return { success: false, message: "Default admin user already exists" };
  },
});

export const me = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await getUserById(ctx.db, identity.subject as Id<"users">);
    if (!user) {
      return null;
    }

    return {
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
    };
  },
});
